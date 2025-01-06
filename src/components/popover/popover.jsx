/**
 * External dependencies.
 */
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Popover = (props) => {
	const {
		trigger,
		position = 'bottom',
		children,
		onClose,
		triggerStyle = {},
	} = props;
	
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef(null);
	const triggerRef = useRef(null);

	const togglePopover = () => setIsOpen(!isOpen);
	const closePopover = () => {
		setIsOpen(false);
		onClose && onClose();
	};	

	/**
	 * Get popover position.
	 * 
	 * @returns {Object} position
	 */
	const getPopoverPosition = () => {
		if (!triggerRef.current || !popoverRef.current) {
			return;
		};

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const popoverRect = popoverRef.current.getBoundingClientRect();

		const positions = {
			top: {
				top: triggerRect.top - popoverRect.height + window.scrollY,
				left: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX,
			},
			bottom: {
				top: triggerRect.bottom + window.scrollY,
				left: triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2 + window.scrollX,
			},
			left: {
				top: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2 + window.scrollY,
				left: triggerRect.left - popoverRect.width + window.scrollX,
			},
			right: {
				top: triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2 + window.scrollY,
				left: triggerRect.right + window.scrollX,
			}
		}

		let newPosition = positions[position];

		// Check if the popover is out of screen
		if (newPosition.left + popoverRect.width > window.innerWidth) {
			newPosition.left = window.innerWidth - popoverRect.width - 10; // 10px margin
		} else if (newPosition.left < 0) {
			newPosition.left = 10; // 10px margin
		}

		if (newPosition.top + popoverRect.height > window.innerHeight) {
			newPosition.top = window.innerHeight - popoverRect.height - 10; // 10px margin
		} else if (newPosition.top < 0) {
			newPosition.top = 10; // 10px margin
		}

		return newPosition;
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target) &&
				!triggerRef.current?.contains(event.target)
			) {
				closePopover();
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen || !popoverRef.current) {
			return;
		}

		const position = getPopoverPosition();
		if (position) {
			popoverRef.current.style.top = `${position.top}px`;
			popoverRef.current.style.left = `${position.left}px`;
		}

		const input = popoverRef.current.querySelector('input');
		input?.focus();

	}, [isOpen]);

	return (
		<>
			<div
    	        className={`popover-trigger ${isOpen ? 'is-active' : ''}`}
				ref={triggerRef}
				onClick={togglePopover}
				style={triggerStyle}
			>
				{trigger}
			</div>

			{ReactDOM.createPortal(
				isOpen && (
					<div ref={popoverRef} className="popover">
						{typeof children === 'function' ? children(closePopover) : children}
					</div>
				),
				document.body
			)}
		</>
	);
};

export default Popover;