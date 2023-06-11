import url from "../config/url";

const getRecipeComments = async (recipeId: string, sort: string) => {
    const customUrl = `${url}/recipes/${recipeId}/comments?sort=${sort}`;
    const response = await fetch(customUrl, {
        credentials: "include"
    });
    const data = await response.json();

    // set back overflow to auto after deleting a comment
    document.body.style.overflow = "auto";
    return data;
}
export default getRecipeComments;