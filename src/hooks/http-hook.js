import React, { useState, useCallback, useRef, useEffect } from 'react';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);

    const activeRequest = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try{
            setIsLoading(true);

            const abortRequestController = new AbortController();
            activeRequest.current.push(abortRequestController);

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal : abortRequestController.signal,
            });

            const data = await response.json();

            activeRequest.current.filter((request) => request !== abortRequestController);

            if(!response.ok){
                throw new Error(data.error); 
            };

            setIsLoading(false)
            return data;
        }catch(err){
            console.log(err);
            setIsLoading(false)
            setErrorMessage(err.message);
            throw err;
        }
    }, []);

    const resetError = () => {
        setErrorMessage(null)
    }

    useEffect(() => {
        return () => {
            activeRequest.current.forEach(request => request.abort());
        }
    }, [])

    return {isLoading, errorMessage, sendRequest, resetError};
}
