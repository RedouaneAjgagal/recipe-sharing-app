import ProfileInfo from "../components/profile";
import { useQuery } from "@tanstack/react-query";
import getProfileInfo from "../fetchers/getProfileInfo";
import Loading from "../UI/Loading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export interface ProfileData {
    _id: string
    user: { _id: string, name: string, email: string }
    picture: string
    bio: string
    favouriteMeals: string[]
}


const Profile = () => {
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
        profileQuery.isLoading ?
            <Loading />
            :
            profileQuery.isSuccess ?
                <ProfileInfo profileInfo={profileQuery.data as ProfileData} />
                :
                null
    )
}

export default Profile;