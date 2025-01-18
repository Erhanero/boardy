/**
 * External dependencies.
 */
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Icon from '@/components/icons/icon';

const Modal = ({ isOpen, title, children, onClose }) => {
	const nodeRef = useRef(null);

	/**
	 * Handle key down.
	 * @param {Event} e
	 * @returns {Void} 
	 */
	const handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
			document.body.classList.add('modal-open');

		} else {
			document.body.classList.remove('modal-open');
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});	

	return (
		<CSSTransition
			in={isOpen}
			timeout={500}
			nodeRef={nodeRef}
			classNames="modal"
			unmountOnExit
		>
			<div className="modal" ref={nodeRef}>
				<div className="modal__overlay" onClick={onClose}></div>

				<div className="modal__inner">
					<button className="modal__close-btn" onClick={onClose}>
						<Icon name="close" />
					</button>

					{title && <h3 className="modal__title">{title}</h3>}

					{children}
				</div>
			</div>
		</CSSTransition>
	)
}

export default Modal;