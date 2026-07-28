import React, { createContext, useState, useContext, useCallback, useRef } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [scrollLockEnabled, setScrollLockEnabled] = useState(false);
  const lockCount = useRef(0);

  const lockScroll = useCallback(() => {
    lockCount.current += 1;
    if (lockCount.current === 1) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current === 0) {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ scrollLockEnabled, setScrollLockEnabled, lockScroll, unlockScroll }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
