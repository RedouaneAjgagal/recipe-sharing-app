const getRecipeComments = async (recipeId: string, sort: string) => {
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}/comments?sort=${sort}`;
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();

    // set back overflow to auto after deleting a comment
    document.body.style.overflow = "auto";
    return data;
}
export default getRecipeComments;