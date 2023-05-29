import url from "../config/url";

const getProfileInfo = async (path: "user" | "favourite") => {
    const response = await fetch(`${url}/${path}`, {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default getProfileInfo;