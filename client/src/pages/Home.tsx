import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { URecipe } from "../components/recipes/Recipe";


const Home = () => {

  const loaderData = useLoaderData() as URecipe[];

  return (
    <div className="px-3">
      <RecipeNav />
      <Recipes recipes={loaderData} />
      <ChangePages />
    </div>
  )
}

export default Home


export const loader: LoaderFunction = async ({ request }) => {
  const isNewest = new URL(request.url).searchParams.get("sort") === "newest";
  let search = "";
  if (isNewest) {
    search = "?sort=newest";
  }
  const url = `http://localhost:5000/api/v1/recipes/${search}`
  const response = await fetch(url);
  const recipes = await response.json();
  return recipes
}