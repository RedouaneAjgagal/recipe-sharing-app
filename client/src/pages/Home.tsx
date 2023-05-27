import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";
import getRecipes from "../fetchers/getRecipes";
import { useQuery } from "@tanstack/react-query";
import { URecipe } from "../components/recipes/Recipe";
import { ImSpinner2 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "popular";


  const query = useQuery({
    queryKey: ["recipes", { page, sort }],
    queryFn: () => getRecipes(page, sort)
  });

  if (query.isLoading) {
    return (
      <div className="flex justify-center w-full mt-10">
        <ImSpinner2 className="animate-spin text-3xl">Loading..</ImSpinner2>
      </div>
    )
  }

  if (query.isError) {
    return <p>error</p>
  }


  const data: { numOfPages: number, recipes: URecipe[] } = query.data;


  return (
    <div className="p-4">
      {data.recipes && data.recipes.length ?
        <>
          <RecipeNav />
          <Recipes recipes={data.recipes} />
          <ChangePages numOfPages={data.numOfPages} />
        </>
        :
        <h1 className="text-xl font-medium text-center">There is no recipe to show</h1>
      }
    </div>
  )
}

export default Home