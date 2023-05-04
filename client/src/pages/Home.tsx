import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";
import { LoaderFunction, json, useLoaderData, redirect } from "react-router-dom";
import { URecipe } from "../components/recipes/Recipe";


const Home = () => {

  const { recipes, numOfPages } = useLoaderData() as { recipes: URecipe[], numOfPages: number };


  return (
    <div className="px-3">
      <RecipeNav />
      <Recipes recipes={recipes} />
      <ChangePages numOfPages={numOfPages} />
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
  const url = `http://localhost:5000/api/v1/recipes/?${sort}${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404 || response.status === 400) {
      return redirect("/", { status: 302 });
    }
    throw json({ msg: response.statusText }, { status: response.status })
  }
  const data = await response.json();
  return data

}