import { useState, useEffect } from "react";

const useStatusResponse = (isShown: boolean) => {
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        if (showStatus) {
            const timer = setTimeout(() => {
                setShowStatus(false);
            }, 2000); // 2 seconds

            return () => clearTimeout(timer);
        }
    }, [showStatus]);

    useEffect(() => {
        if (isShown) {
            setShowStatus(true);
        }
    }, [isShown])

    return showStatus;
}

export default useStatusResponse;