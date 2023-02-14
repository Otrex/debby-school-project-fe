export default {
  useLocalStorage: (storeName: string) => {
    return {
      getItem: () => {
        return JSON.parse(localStorage.getItem(storeName) || '{}')?.value;
      },
      setItem: (value: any) => {
        localStorage.setItem(storeName, JSON.stringify({ value }));
      },
      removeItem: (key: string) => {
        localStorage.removeItem(storeName);
      },
    };
  },
};
