import url from "../config/url";

const getSingleRecipe = async (recipeId: string) => {
    const customUrl = `${url}/recipes/${recipeId}`;
    const response = await fetch(customUrl, {
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
}

export default getSingleRecipe;