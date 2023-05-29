import url from "../config/url";

const getUserRecipes = async () => {
    const response = await fetch(`${url}/recipes/current-user`, {
        method: "GET",
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default getUserRecipes;