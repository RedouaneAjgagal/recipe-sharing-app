import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import url from "../config/url";
const useAuthentication = () => {
    const [isUserInfo, setIsUserInfo] = useState<null | { _id: string, name: string, picture: string }>(null);
    const location = useLocation();
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${url}/user/current-user`, {
                method: "GET",
                credentials: "include"
            });
            if (!response.ok) {
                setIsUserInfo(null);
                return;
            }

            const data = await response.json() as { user: { _id: string, name: string, picture: string } };
            setIsUserInfo(data.user);
        }
        fetchUserData();

    }, [location]);

    return isUserInfo
}

export default useAuthentication