import { ActionFunction, LoaderFunction, json, redirect } from "react-router-dom"
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

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const recipeId = formData.get("recipeId");
    if (request.method === "DELETE") {
        const response = await fetch(`${url}/recipes/${recipeId}`, {
            method: request.method,
            credentials: "include"
        });

        if (response.status === 401) {
            return redirect("/login");
        }

        const data = await response.json();
        if (!response.ok) {
            throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
        }
        console.log(data);
        document.body.style.overflow = "auto";
        return null;
    }

    return null
}