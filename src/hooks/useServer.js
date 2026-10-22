import { useState, useCallback } from "react";
import { getTokenFromLocalStorage } from "../helper/LocalStorage";

/**
 * Standardized API client hook for executing backend requests
 */
export function useServer() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Execute an API call against the backend
   * @param {string} API - Target URL endpoint
   * @param {string} [method="GET"] - HTTP method
   * @param {any} [body=null] - Request payload
   * @param {Object} [options={}] - Custom options (e.g., custom headers, timeoutMs)
   */
  const handleAPICall = useCallback(
    async (API, method = "GET", body = null, customOptions = {}) => {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      // Support request timeout via AbortController
      const timeoutMs = customOptions.timeoutMs || 20000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const headers = {
          "Content-Type": "application/json",
          ...customOptions.headers,
        };

        const token = getTokenFromLocalStorage();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const requestConfig = {
          method,
          headers,
          signal: controller.signal,
        };

        if (body && method !== "GET") {
          requestConfig.body = JSON.stringify(body);
        }

        const response = await fetch(API, requestConfig);
        clearTimeout(timeoutId);

        let result = null;
        try {
          result = await response.json();
        } catch (parseErr) {
          result = {
            success: response.ok,
            message: response.statusText || `Server returned status ${response.status}`,
          };
        }

        if (response.ok && result?.success !== false) {
          // Standardized data extraction
          // Prioritize result.data, with fallback to legacy aliases (result.link, result.links, result.user)
          const extractedData =
            result?.data !== undefined
              ? result.data
              : result?.link ??
                result?.links ??
                result?.user ??
                result;

          const successMsg = result?.message || result?.msg || "Operation completed successfully";

          setData(extractedData);
          setMessage(successMsg);

          // Return enriched response that works with both new standardized contract and legacy properties
          return {
            success: true,
            message: successMsg,
            data: extractedData,
            meta: result?.meta || null,
            // Compatibility properties
            token: result?.token ?? (result?.data?.token || null),
            user: result?.user ?? (result?.data?.user || null),
            link: result?.link ?? (result?.data && !Array.isArray(result?.data) ? result.data : null),
            links: result?.links ?? (Array.isArray(result?.data) ? result.data : []),
            count: result?.count ?? (result?.meta?.count || (Array.isArray(result?.data) ? result.data.length : 0)),
            raw: result,
          };
        } else {
          // Standardized error extraction
          const errorMsg =
            result?.message ||
            result?.msg ||
            result?.error?.message ||
            (response.status === 401
              ? "Your session has expired. Please log in again."
              : response.status === 404
              ? "The requested resource could not be found."
              : `Request failed with status ${response.status}`);

          const errorCode =
            result?.error?.code ||
            (response.status ? `HTTP_${response.status}` : "REQUEST_FAILED");

          const errorPayload = {
            message: errorMsg,
            code: errorCode,
            status: response.status,
            details: result?.error?.details || null,
          };

          setError(errorPayload);
          return null;
        }
      } catch (err) {
        clearTimeout(timeoutId);

        let errorMsg = "Unable to connect to the server. Please check your internet connection.";
        let errorCode = "NETWORK_ERROR";

        if (err.name === "AbortError") {
          errorMsg = "The request timed out. Please try again.";
          errorCode = "TIMEOUT";
        } else if (err.message) {
          errorMsg = err.message;
        }

        const networkError = {
          message: errorMsg,
          code: errorCode,
          status: null,
          details: null,
        };

        setError(networkError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setData(null);
    setMessage(null);
    setError(null);
  }, []);

  return {
    handleAPICall,
    isLoading,
    error,
    data,
    message,
    reset,
  };
}
