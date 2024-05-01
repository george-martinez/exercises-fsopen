import { useEffect, useState } from "react";

export const useNotification = () => {
    const [ notification, setNotification ] = useState<string>('');
    useEffect(() => {
        const settedTimerId = setTimeout(() => {
            setNotification('');
        }, 3000);

        return () => {
            clearTimeout(settedTimerId);
        };
    },[notification]);

    return [ notification, setNotification ] as const;
};