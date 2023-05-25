import { LoaderFunction, json } from "react-router-dom"
import url from "../config/url"
import UserProfile from "../components/usersProfiles"
import { ProfileData } from "./Profile"
import { URecipe } from "../components/recipes/Recipe";

export interface UUserProfile {
    profile: ProfileData;
    recipes: { recipe: URecipe }[];
}

const UsersProfile = () => {
    return (
        <UserProfile />
    )
}

export default UsersProfile

export const loader: LoaderFunction = async ({ params }) => {
    const { profileId } = params;
    const response = await fetch(`${url}/user/${profileId}`);
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }

    return data;
}