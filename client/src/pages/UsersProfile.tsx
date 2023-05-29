import UserProfile from "../components/usersProfiles"
import { ProfileData } from "./Profile"
import { URecipe } from "../components/recipes/Recipe";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getUserInfo from "../fetchers/getUserInfo";
import Loading from "../UI/Loading";

export interface UUserProfile {
    profile: ProfileData;
    recipes: { recipe: URecipe }[];
}

const UsersProfile = () => {
    const { profileId } = useParams();
    const userInfoQuery = useQuery({
        queryKey: ["usersProfile", { profileId }],
        queryFn: () => getUserInfo(profileId!)
    })
    return (
        userInfoQuery.isLoading ?
            <Loading />
            :
            <UserProfile userInfo={userInfoQuery.data as UUserProfile} />
    )
}

export default UsersProfile;