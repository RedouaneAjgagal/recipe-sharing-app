import url from "../config/url";

const rateRecipe = async ({ recipeId, rateNum }: { recipeId: string, rateNum: number }) => {
    const response = await fetch(`${url}/rates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipe: recipeId, rate: rateNum })
    });
    const data = await response.json() as { msg: string, rate: undefined } | { rate: number, msg: undefined };

    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data.rate;
}

export default rateRecipe;