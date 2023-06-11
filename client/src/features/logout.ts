// import { ActionFunction, redirect } from "react-router-dom";
import url from "../config/url";

const logout = async () => {
    await fetch(`${url}/auth/logout`, {
        method: "GET",
        credentials: "include"
    });
}

export default logout;