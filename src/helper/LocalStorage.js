const defaultData = {
    isAuthenticated: false,
    token: "12"
};
export const initialize = () => {
    const storedData = localStorage.getItem('data');
    if (!storedData) {
        console.log(storedData);
        setDataToLocalStorage((defaultData));
    }
}

export const getDataFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (!data)
        return defaultData;
    return data
}

export const setDataToLocalStorage = (data) => {
    if (!data?.token) {
        if (getDataFromLocalStorage())
            data.token = getDataFromLocalStorage().token;
        else
            data.token = ""
    }
    console.log(data)
    return window.localStorage.setItem('data', JSON.stringify(data))
}

export const getTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('data'))?.token;
}

export const setTokenToLocalStorage = (token) => {
    const data = getDataFromLocalStorage();
    data.token = token;
    setDataToLocalStorage(data);

}

export const clearLoacalstorage = () => {
    window.localStorage.removeItem('data');
 }
