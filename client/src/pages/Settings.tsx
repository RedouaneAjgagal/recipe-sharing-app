import ProfileSettings from '../components/userInfoSettings'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import getProfileInfo from '../fetchers/getProfileInfo';
import Loading from '../UI/Loading';
import { ProfileData } from './Profile';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UUser } from './Root';

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


    const queryClient = useQueryClient();
    const queryData = queryClient.getQueryData(["authentication"]) as { user: UUser };
    console.log(queryData);
    
    return (
        authenticationQuery.isSuccess ?
            profileQuery.isLoading ?
                <Loading />
                :
                <ProfileSettings profileInfo={profileQuery.data as ProfileData} />
            :
            null
    )
}

export default Settings