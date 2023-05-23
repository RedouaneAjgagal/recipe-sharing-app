import { ActionFunction, LoaderFunction, json, redirect } from 'react-router-dom'
import ProfileSettings from '../components/userInfoSettings'
import url from '../config/url'

export interface ProfileData {
    _id: string
    user: { _id: string, name: string, email: string }
    picture: string
    bio: string
    favouriteMeals: string[]
}

const Settings = () => {
    return (
        <ProfileSettings />
    )
}

export default Settings

export const loader: LoaderFunction = async () => {
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

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const getAllMeals = formData.get("favouriteMeals")?.toString();
    const favouriteMeals = getAllMeals ? getAllMeals.split(",") : [];
    const name = formData.get("Name")!.toString();
    const bio = formData.get("Bio")!.toString();
    const picture = formData.get("image")?.toString();

    // initial errors
    let errors: { name: boolean, bio: boolean, favouriteMeals: boolean } = {
        bio: false,
        favouriteMeals: false,
        name: false
    }

    // push added meals to favourite meals
    formData.forEach((value, key) => {
        if (key.startsWith("favouriteMeal_")) {
            if (value.toString().trim() === "") return;
            favouriteMeals?.push(value as string);
        }
    });

    // Additional validation
    if (favouriteMeals && favouriteMeals.length > 15) {
        errors.favouriteMeals = true;
    }
    if (name.trim() === "") {
        errors.name = true
    }
    if (bio.trim() === "" || bio.length > 300) {
        errors.bio = true;
    }

    // if any error return errors
    if (Object.values(errors).some(value => value === true)) {
        return errors;
    }

    // update request
    const response = await fetch(`${url}/user`, {
        method: request.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, favouriteMeals, picture })
    });

    // if unauthenticated
    if (response.status === 401) {
        return redirect("/login");
    }

    // if something get wong with the server
    if (response.status === 500) {
        return json({ msg: "Something went wrong.." }, { status: response.status, statusText: response.statusText })
    }

    return redirect("");
}