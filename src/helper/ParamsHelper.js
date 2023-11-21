export const AVAILABLE_MODE = ['LINK','QR'];

export const getCurrentUrl = () =>  new URL(window.location.href);

export const getMode = () => {
    
    const mode = getCurrentUrl().searchParams.get('mode');
    return mode?.toUpperCase();
}