import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const useUI = () => {
    return useContext(UIContext);
};

export const UIProvider = ({ children }) => {
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

    const openComingSoon = () => setIsComingSoonOpen(true);
    const closeComingSoon = () => setIsComingSoonOpen(false);

    const value = {
        isComingSoonOpen,
        openComingSoon,
        closeComingSoon
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};
