// Keyboard shortcuts helper
export const keyboardHelper = {
  shortcuts: {
    newCard: 'n',
    newList: 'l',
    search: '/',
    toggleSidebar: 'b',
    startPomodoro: 'space',
    settings: ',',
  },

  registerShortcut: (
    key: string,
    callback: () => void,
    options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}
  ) => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === !!options.ctrl &&
        e.shiftKey === !!options.shift &&
        e.altKey === !!options.alt
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  },

  isModifierPressed: (e: KeyboardEvent): boolean => {
    return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
  },
};
