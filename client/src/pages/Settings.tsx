import ProfileSettings from '../components/userInfoSettings'
import { useQuery } from '@tanstack/react-query';
import getProfileInfo from '../fetchers/getProfileInfo';
import Loading from '../UI/Loading';
import { ProfileData } from './Profile';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const profileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfileInfo("user")
    });

    const authenticationQuery = useQuery(["authentication"])
    useEffect(() => {
        if (authenticationQuery.isError && (authenticationQuery.error as Error).message === "Authentication failed") {
            return navigate("/login");
        }
    }, [authenticationQuery.isError, authenticationQuery.error])

    return (
        authenticationQuery.isSuccess ?
            profileQuery.isLoading ?
                <Loading />
                :
                profileQuery.isSuccess ?
                    <ProfileSettings profileInfo={profileQuery.data as ProfileData} />
                    :
                    <p>{(profileQuery.error as Error)?.message}</p>
            :
            null
    )
}

export default Settings