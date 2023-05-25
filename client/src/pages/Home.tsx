import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";
import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import { URecipe } from "../components/recipes/Recipe";
import url from "../config/url";


const Home = () => {

  const { recipes, numOfPages } = useLoaderData() as { recipes: URecipe[], numOfPages: number };


  return (
    <div className="p-4">
      {recipes && recipes.length ?
        <>
          <RecipeNav />
          <Recipes recipes={recipes} />
          <ChangePages numOfPages={numOfPages} />
        </>
        :
        <h1 className="text-xl font-medium text-center">There is no recipe to show</h1>
      }
    </div>
  )
}

export default Home


export const loader: LoaderFunction = async ({ request }) => {
  const isSorting = new URL(request.url).searchParams.has("sort");
  const isPages = new URL(request.url).searchParams.has("page");
  let sort = "";
  let page = ""
  if (isSorting) {
    const sortValue = new URL(request.url).searchParams.get("sort")!
    sort = `sort=${sortValue}`;
  }
  if (isPages) {
    const pageNum = new URL(request.url).searchParams.get("page")!
    page = isPages ? `&page=${pageNum}` : `page=${pageNum}`
  }
  const customUrl = `${url}/recipes/?${sort}${page}`;
  const response = await fetch(customUrl);
  if (!response.ok) {
    throw json({ msg: response.statusText }, { status: response.status })
  }
  const data = await response.json();
  return data

}