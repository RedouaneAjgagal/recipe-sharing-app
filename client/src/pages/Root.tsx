import { LoaderFunction, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import url from "../config/url";

export interface UUser {
    _id: string;
    name: string;
    picture: string;
}

const Root = () => {

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Root;


export const loader: LoaderFunction = async () => {
    const response = await fetch(`${url}/user/current-user`, {
        method: "GET",
        credentials: "include"
    });
    if (!response.ok) {
        return null
    }
    const data = await response.json() as { user: UUser };

    return data.user;
}

