import { LoaderFunction, json, redirect } from 'react-router-dom'
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