export const getStorageData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}


export const clearStorageData = (key) => {
    localStorage.clear(key)
}

export const clearStorage = () => {
    localStorage.clear()
}

export const setData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const truncateString = (string = '', maxLength = 50) =>  string.length > maxLength 
    ? `${string.substring(0, maxLength)}…`
    : string


export  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };