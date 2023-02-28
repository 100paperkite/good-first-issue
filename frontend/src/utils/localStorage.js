export const store = {
  saveLocalStorage: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};
