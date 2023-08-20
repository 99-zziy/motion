const store = {
  setLocalStorage(menu: string): void {
    localStorage.setItem("record", JSON.stringify(menu));
  },
  getLocalStorage(): string | null {
    const record = localStorage.getItem("record");
    if (record) {
      return JSON.parse(record);
    }
    return null;
  },
};

export default store;
