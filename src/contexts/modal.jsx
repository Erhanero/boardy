/**
 * External dependencies.
 */
import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);