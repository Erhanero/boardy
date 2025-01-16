/**
 * External dependencies.
 */
import { useState, useCallback } from 'react';
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
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Handle confirm.
     * 
     * @returns {Void}
     */
    const handleConfirm = useCallback(async () => {
        try {
            setIsProcessing(true);
            await onConfirm();
            onClose();

        } catch (error) {
            console.error(error);
            
        } finally {
            setIsProcessing(false);
        }
    }, [onConfirm, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="modal-confirm">
                <p className="modal-confirm__message">{message}</p>
                
                <div className="modal-confirm__actions">
                    <Button onClick={onClose} variant="lightblue">
                        Cancel
                    </Button>
                    
                    <Button onClick={handleConfirm} disabled={isProcessing} variant="red">
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalConfirm;