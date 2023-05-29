import UserRecipe from "./UserRecipe"
import { UProfileRecipes } from "../../pages/ProfileRecipes";

interface Props {
    userRecipes: UProfileRecipes[];
}

const UserRecipesList = (props: React.PropsWithoutRef<Props>) => {

    return (
        <div className="flex flex-col gap-4">
            {props.userRecipes.map(recipe => <UserRecipe key={recipe._id} id={recipe._id} image={recipe.images[0]} title={recipe.title} />)}
        </div>
    )
}

export default UserRecipesList