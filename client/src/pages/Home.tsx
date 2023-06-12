import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";
import getRecipes from "../fetchers/getRecipes";
import { useQuery } from "@tanstack/react-query";
import { URecipe } from "../components/recipes/Recipe";
import { useSearchParams } from "react-router-dom";
import Loading from "../UI/Loading";

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "popular";


  const query = useQuery({
    queryKey: ["recipes", { page, sort }],
    queryFn: () => getRecipes(page, sort),
    keepPreviousData: true
  });

  const data: { numOfPages: number, recipes: URecipe[] } = query.data;


  return (
    <div className="p-4 pt-2">
      <RecipeNav />
      {query.isLoading ?
        <Loading /> :
        (query.isSuccess ?
          data.recipes && data.recipes.length ?
            <>
              <Recipes recipes={data.recipes} />
              <ChangePages numOfPages={data.numOfPages} />
            </>
            :
            <h1 className="text-xl font-medium text-center">There is no recipe to show</h1>
          :
          <p>{(query.error as Error)?.message}</p>
        )
      }
    </div>
  )
}

export default Home