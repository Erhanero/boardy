/**
 * External dependencies.
 */
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

/**
 * Internal dependencies.
 */
import boardService from "@/services/board-service";

const useBoards = () => {
    const [boards, setBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    /**
     * On success.
     *
     * @param {Object} boardsData
     * @returns {Void}
     */
    const onSuccess = (boardsData) => {
        setBoards(boardsData);
        setIsLoading(false);
    };

    /**
     * On error.
     *
     * @param {Object} error
     * @returns {Void}
     */
    const onError = (error) => {
        console.error(error.message);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const unsubscribe = boardService.getBoards(user.uid, onSuccess, onError);

        return () => unsubscribe();
    }, [user]);

    return {
        boards,
        isLoading,
    };
};

export default useBoards;
