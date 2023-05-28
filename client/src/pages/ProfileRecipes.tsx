import { LoaderFunction, json, redirect } from "react-router-dom"
import UserRecipes from "../components/userRecipes"
import url from "../config/url"

export interface UProfileRecipes {
    _id: string;
    title: string;
    images: string[]
}

const ProfileRecipes = () => {
    return (
        <UserRecipes />
    )
}

export default ProfileRecipes

export const loader: LoaderFunction = async () => {
    const response = await fetch(`${url}/recipes/current-user`, {
        method: "GET",
        credentials: "include"
    });
    if (response.status === 401) {
        return redirect("/login");
    }
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }
    return data;
}