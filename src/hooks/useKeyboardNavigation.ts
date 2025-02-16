// hooks/useKeyboardNavigation.ts
import { useEffect, useCallback } from 'react';

const useKeyboardNavigation = (
    onNext: () => void,
    onPrevious: () => void
) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            onNext();
        } else if (event.key === 'ArrowLeft') {
            onPrevious();
        }
    }, [onNext, onPrevious]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};

export default useKeyboardNavigation;