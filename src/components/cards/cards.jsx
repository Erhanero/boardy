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
import FormCard from '@/components/form-card/form-card';
import useCards from '@/hooks/cards/use-cards';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

const Cards = ({ listId, boardId }) => {
    const { cards, isLoading } = useCards(listId);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    /**
     * Card click handler.
     * 
     * @param {Object} cardData 
     * @returns {Void}
     */
    const cardClickHandler = (cardData) => {
        setIsEditMode(true);
        setShowModal(true);
        setSelectedCard(cardData);
    }

    /**
     * Handle close modal.
     * 
     * @returns {Void}
     */
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditMode(false);
        setSelectedCard(null);
    };

    /**
     * Handle open modal.
     *      
     * @returns {Void}
     */
    const handleOpenModal = () => {
        setShowModal(true);
    };

    if (isLoading) {
        return <LoadingSpinner width="60" />;
    }

    return (
        <div className="cards">
            <div className="cards__inner">
                <Stack direction="column" alignItems="normal" rowGap="12">
                    {cards.map(card => {
                        return <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            label={card.label}
                            onClick={cardClickHandler}
                        />;
                    })}
                </Stack>
            </div>

            <Button className="cards__button" onClick={handleOpenModal}>+ Add a card</Button>

            <Modal isOpen={showModal} title={isEditMode ? "Edit card" : "Create new card"} onClose={handleCloseModal}>
                {isEditMode ? (
                    <FormCard
                        cardData={selectedCard}
                        mode="edit"
                        listId={listId}
                        boardId={boardId}
                        onSuccess={handleCloseModal}
                    />

                ) : (
                    <FormCard
                        listId={listId}
                        boardId={boardId}
                        onSuccess={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Cards;