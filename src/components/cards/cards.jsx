/**
 * External dependencies.
 */
import { useState } from 'react';

/**
* Internal dependencies.
*/
import Card from '@/components/card/card';
import Stack from '@/components/stack/stack';
import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import FormAddCard from '@/components/form-add-card/form-add-card';

const Cards = () => {
    const [showModal, setShowModal] = useState(false);

    /**
     * Handle close modal.
     * 
     * @returns {Void}
     */
    const handleCloseModal = () => {
        setShowModal(false);
    };

    /**
     * Handle open modal.
     * 
     * @param {Event} e 
     * @returns {Void}
     */
    const handleOpenModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };

    return (    
        <div className="cards">
            <Stack direction="column" rowGap="12">
                <Card />
                <Card />
                <Card />
                <Card />

                <Button onClick={handleOpenModal}>+ Add new card</Button>
            </Stack>

            <Modal isOpen={showModal} title="Create new card" onClose={handleCloseModal}>
                <FormAddCard />
            </Modal>
        </div>
    );
};

export default Cards;