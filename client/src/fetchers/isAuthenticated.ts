import url from "../config/url";

const isAuthenticated = async () => {
    const response = await fetch(`${url}/user/current-user`, {
        method: "GET",
        credentials: "include"
    });

    if (response.status === 401) {
        throw new Error("Authentication failed");
    }

    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json() as { user: { _id: string, name: string, picture: string } };


    return data;
}

export default isAuthenticated;