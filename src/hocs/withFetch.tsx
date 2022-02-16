import React, { useEffect, useState } from "react";
import { ImageProperties } from "../components/slider/slider";


export interface FetchResponseProps {
    data: ImageProperties[];
    isLoading: boolean;
    isError: boolean;
}

function withFetch<T>(WrappedComponent: React.ComponentType<T & FetchResponseProps>, requestUrl: RequestInfo) {
    const WithFetch = (props: T) => {
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [isError, setIsError] = useState(false);

        useEffect(() => {
            if (requestUrl) fetchData(requestUrl);
        }, []);

        const fetchData = async (requestUrl: RequestInfo) => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetch(requestUrl);
                if (response.ok) {
                    const data = await response.json();

                    setIsLoading(false);
                    setData(data);
                } else {
                    throw new Error("Fetch request error");
                }
            } catch (err) {
                setIsLoading(false);
                setIsError(true);
            }
        };

        return (
            <WrappedComponent
                data={data}
                isLoading={isLoading}
                isError={isError}
                {...props}
                getData={(requestUrl: RequestInfo) => fetchData(requestUrl)}
            />
        );
    };

    return WithFetch;
}

export default withFetch;