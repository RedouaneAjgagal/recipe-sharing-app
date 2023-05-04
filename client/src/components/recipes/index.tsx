import RecipesList from "./RecipesList"
import { URecipe } from "./Recipe"


interface Props {
  recipes: URecipe[]
}

const Recipes = (props: React.PropsWithoutRef<Props>) => {
  return (
    <RecipesList recipes={props.recipes} />
  )
}

export default Recipes