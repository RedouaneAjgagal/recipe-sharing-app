import UserRecipe from "./UserRecipe"
import { UProfileRecipes } from "../../pages/ProfileRecipes";

interface Props {
    userRecipes: UProfileRecipes[];
}

const UserRecipesList = (props: React.PropsWithoutRef<Props>) => {

    return (
        <div className="flex flex-col gap-4">

            {props.userRecipes.length ?
                props.userRecipes.map(recipe => <UserRecipe key={recipe._id} id={recipe._id} image={recipe.images[0]} title={recipe.title} />)
                :
                <h2 className="text-center  text-lg tracking-wide text-slate-400">You have no recipes yet</h2>
            }
        </div>
    )
}

export default UserRecipesList