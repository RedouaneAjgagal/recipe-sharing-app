import url from "../config/url";

const getRecipes = async (page: string, sort: string) => {
    const customUrl = `${url}/recipes/?page=${page}&sort=${sort}`;
    const response = await fetch(customUrl);
    const data = response.json();
    return data;
}

export default getRecipes;