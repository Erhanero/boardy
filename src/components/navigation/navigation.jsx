import { useAuth } from '@/contexts/auth';

const Navigation = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // или loading компонент
    }

    return (
        <nav>
            {user ? (
                // навигация за логнати потребители
            ) : (
                // навигация за нелогнати потребители
            )}
        </nav>
    );
}; 