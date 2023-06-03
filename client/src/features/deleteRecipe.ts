import url from "../config/url";

const deleteRecipe = async (recipeId: string) => {
    const response = await fetch(`${url}/recipes/${recipeId}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return null;
}

export default deleteRecipe;