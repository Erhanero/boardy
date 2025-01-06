/**
 * External dependencies.
 */
import Modal from '@/components/modal/modal';
import Button from '@/components/button/button';

const ModalConfirm = (props) => {
	const {
		isOpen,
		onClose,
		onConfirm,
		title,
		message
	} = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="modal-confirm">
                <p className="modal-confirm__message">{message}</p>
                
                <div className="modal-confirm__actions">
                    <Button onClick={onClose} variant="lightblue">
                        Cancel
                    </Button>
                    
                    <Button onClick={onConfirm} variant="red">
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalConfirm;