import ProfileInfo from "../components/profile";
import { useQuery } from "@tanstack/react-query";
import getProfileInfo from "../fetchers/getProfileInfo";
import Loading from "../UI/Loading";


export interface ProfileData {
    _id: string
    user: { _id: string, name: string, email: string }
    picture: string
    bio: string
    favouriteMeals: string[]
}


const Profile = () => {

    const profileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfileInfo("user")
    });

    return (
        profileQuery.isLoading ?
            <Loading />
            :
            <ProfileInfo profileInfo={profileQuery.data as ProfileData} />
    )
}

export default Profile;