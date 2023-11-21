import { useState, useCallback } from "react";
// always use object for defining error must containing message and status property 

export function useServer() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleAPICall = useCallback(async (API, method = "GET", body = undefined) => {
        setIsLoading(true);
        try {
            const response = await fetch(API, { method, body: JSON.stringify(body) });
            const result = await response.json();
            if (!response.ok)
                setError({ message: result.message, status: response.status });
            else {
                setData(result.message);
            }

        } catch (error) {
            setError({ message: error.message, status: null });
        } finally {
            setIsLoading(false);
        }
    }, []);

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
