const defaultData = {
  isAuthenticated: false,
  token: "",
};

export const initialize = () => {
  try {
    const storedData = localStorage.getItem("data");
    if (!storedData) {
      setDataToLocalStorage(defaultData);
    }
  } catch (err) {
    console.error("Failed to initialize localStorage:", err);
  }
};

export const getDataFromLocalStorage = () => {
  try {
    const raw = localStorage.getItem("data");
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return parsed || defaultData;
  } catch (err) {
    return defaultData;
  }
};

export const setDataToLocalStorage = (data) => {
  try {
    const current = getDataFromLocalStorage();
    const updated = {
      ...current,
      ...data,
      token: data?.token !== undefined ? data.token : current.token || "",
      isAuthenticated: Boolean(data?.token || current.token),
    };
    window.localStorage.setItem("data", JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
    return null;
  }
};

export const getTokenFromLocalStorage = () => {
  return getDataFromLocalStorage()?.token || "";
};

export const setTokenToLocalStorage = (token) => {
  const data = getDataFromLocalStorage();
  data.token = token || "";
  data.isAuthenticated = Boolean(token);
  setDataToLocalStorage(data);
};

export const clearLocalStorage = () => {
  try {
    window.localStorage.removeItem("data");
  } catch (err) {
    console.error("Failed to clear localStorage:", err);
  }
};

// Backward-compatibility alias for legacy typo
export const clearLoacalstorage = clearLocalStorage;
