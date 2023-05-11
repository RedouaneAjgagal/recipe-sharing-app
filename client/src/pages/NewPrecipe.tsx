import { ActionFunction } from "react-router-dom"
import CreateRecipe from "../components/createRecipe"
import CreateRecipeNav from "../components/createRecipe/CreateRecipeNav"
// import url from "../config/url"

const NewPrecipe = () => {
    return (
        <div>
            <CreateRecipeNav />
            <CreateRecipe />
        </div>
    )
}

export default NewPrecipe


export const action: ActionFunction = async ({ request }) => {

    console.log("action");


    // const response = await fetch(`${url}/recipes`, {
    //     method: request.method,
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({}),
    //     credentials: "include"
    // });

    // const data = await response.json();

    return null
}