/**
 * External dependencies.
 */
import { useState, useMemo} from 'react';
import { SortableContext } from '@dnd-kit/sortable';

/**
 * Internal dependencies.
*/
import Card from '@/components/card/card';
import Stack from '@/components/stack/stack';
import Button from '@/components/button/button';
import Modal from '@/components/modal/modal';
import FormCard from '@/components/form-card/form-card';

const Cards = ({ cards = [], listId, boardId }) => {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const cardsIds = useMemo(() => cards.map(card => card.id), [cards]); 
    
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

    return (
        <div className="cards">
            <SortableContext items={cardsIds}>
                {cards.length > 0 && (
                    <div className="cards__inner">
                        <Stack direction="column" alignItems="normal" rowGap="12">
                            {cards.map(card => {
                                return <Card
                                    key={card.id}
                                    card={card}
                                    onClick={cardClickHandler}
                                    listId={listId}
                                />;
                            })}
                        </Stack>
                    </div>
                )}
            </SortableContext>

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