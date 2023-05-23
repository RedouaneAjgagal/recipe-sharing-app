import { LoaderFunction, defer, json, redirect } from "react-router-dom";
import url from "../config/url";
import ProfileInfo from "../components/profile";


export interface ProfileData {
    _id: string
    user: { _id: string, name: string, email: string }
    picture: string
    bio: string
    favouriteMeals: string[]
}


const Profile = () => {
    return (
        <ProfileInfo />
    )
}

export default Profile


const loaderData = async (customUrl: string) => {
    const response = await fetch(customUrl, {
        method: "GET",
        credentials: "include"
    });

    // if unauthenticated user 
    if (response.status === 401) {
        return { unauthenticated: true }
    }
    // if other error
    if (!response.ok) {
        return { error: true, response }
    }

    const data = await response.json();
    return data;
}

export const loader: LoaderFunction = async () => {
    const profileUrl = `${url}/user`;
    const favouriteRecipesUrl = `${url}/favourite`;
    const profile = await loaderData(profileUrl);

    // unauthenticated
    if (profile.unauthenticated) {
        return redirect("/login");
    }

    // other errors
    if (profile.error) {
        throw json({ msg: "Something went wrong" }, { status: profile.response.status, statusText: profile.response.statusText })
    }

    return defer({
        profile,
        favouriteRecipes: loaderData(favouriteRecipesUrl)
    });
}