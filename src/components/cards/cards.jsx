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
            <div className="cards__inner">
                <Stack direction="column" alignItems="normal" rowGap="12">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </Stack>
            </div>

            <Button className="cards__button" onClick={handleOpenModal}>+ Add new card</Button>

            <Modal isOpen={showModal} title="Create new card" onClose={handleCloseModal}>
                <FormAddCard />
            </Modal>
        </div>
    );
};

export default Cards;