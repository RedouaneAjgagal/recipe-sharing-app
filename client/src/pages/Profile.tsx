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


const ProfileDataLoder = async () => {
    const response = await fetch(`${url}/user`, {
        method: "GET",
        credentials: "include"
    });

    // if unauthenticated user 
    if (response.status === 401) {
        return redirect("/login");
    }

    const data = await response.json();

    // if server error
    if (response.status === 500) {
        return json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }

    return data;
}

const favouriteRecipesLoader = async () => {
    const response = await fetch(`${url}/favourite`, {
        method: "GET",
        credentials: "include"
    });

    // if unauthenticated user 
    if (response.status === 401) {
        return redirect("/login");
    }

    const data = await response.json();

    // if server error
    if (!response.ok) {
        return json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }

    return data;
}

export const loader: LoaderFunction = async () => {
    return defer({
        profile: await ProfileDataLoder(),
        favouriteRecipes: favouriteRecipesLoader()
    });
}