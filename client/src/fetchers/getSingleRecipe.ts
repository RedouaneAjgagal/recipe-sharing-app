import { json } from "react-router-dom";


const getSingleRecipe = async (recipeId: string) => {
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}`;
    const response = await fetch(url, {
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText })
    }
    return data;
}

export default getSingleRecipe;