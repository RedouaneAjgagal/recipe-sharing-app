import RecipeNav from "../components/recipes/RecipeNav";
import Recipes from "../components/recipes";
import ChangePages from "../components/recipes/ChangePages";


const Home = () => {
  return (
    <div className="px-3">
      <RecipeNav />
      <Recipes />
      <ChangePages />
    </div>
  )
}

export default Home