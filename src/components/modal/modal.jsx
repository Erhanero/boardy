/**
 * External dependencies.
 */
import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ isOpen, title, children, onClose }) => {
	const nodeRef = useRef(null);
	const modalRef = useRef(null);

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

			modalRef.current?.querySelector('input, textarea')?.focus();            

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

				<div className="modal__inner" ref={modalRef}>
					<button className="modal__close-btn" onClick={onClose}>
						<svg width="24" height="24" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path>
						</svg>
					</button>

					{title && <h3 className="modal__title">{title}</h3>}

					{children}
				</div>
			</div>
		</CSSTransition>
	)
}

export default Modal;