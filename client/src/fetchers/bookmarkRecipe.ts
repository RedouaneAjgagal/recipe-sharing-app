import url from "../config/url";

const bookmarkRecipe = async (recipeId: string) => {
    const response = await fetch(`${url}/favourite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipe: recipeId })
    });

    const data = await response.json() as { msg: string, added: boolean, removed: null } | { msg: string, removed: boolean, added: null };

    if (!response.ok) {
        throw new Error(data.msg);
    }

    return data;
}

export default bookmarkRecipe;