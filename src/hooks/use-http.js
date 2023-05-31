
import { useCallback, useState } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(async (reqConfig, responseData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
            reqConfig.url,
            {
                method: reqConfig.method ? reqConfig.method :  "GET",
                headers: reqConfig.headers ? reqConfig.headers : {},
                body: JSON.stringify(reqConfig.body) ? JSON.stringify(reqConfig.body) : null
            }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        responseData(data)
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, []);

    return {isLoading, error, sendHttpRequest}
}

export default useHttp;