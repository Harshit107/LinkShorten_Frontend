import { useState, useCallback } from "react";
import { getTokenFromLocalStorage } from '../helper/LocalStorage'
// always use object for defining error must containing message and status property 

export function useServer() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleAPICall = async (API, method = "GET", body = {}) => {
        
        setIsLoading(true);
        console.log("Calling API");
        try {
            const response = await fetch(API, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getTokenFromLocalStorage()
                },
                body: method === 'GET' ? undefined : JSON.stringify(body),
            });
            const result = await response.json();

            if (response.ok) {
                setData(result.message);
                 console.log("Returning result...");
                return result.message ?? result;
            }
            setError({ message: result.message, status: response.status });

        } catch (error) {
            setError({ message: error.message, status: null });
        } finally {
            setIsLoading(false);
        }
    };

    const reset = useCallback(() => {
        setIsLoading(false);
        setData(null);
        setError(null);
    }, []);

    return {
        handleAPICall,
        isLoading,
        error,
        data,
        reset
    };
}
