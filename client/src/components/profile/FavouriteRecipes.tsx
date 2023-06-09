import Recipe, { URecipe } from "../recipes/Recipe";

interface Props {
    recipes: { recipe: URecipe }[];
    favourited?: boolean
}

const FavouriteRecipes = (props: React.PropsWithoutRef<Props>) => {

    return (
        <div className='p-7'>
            <h2 className='font-medium text-center tracking-wider mb-5'>{props.favourited ? "FAVOURITE" : "RECENT"} RECIPES</h2>
            {props.recipes.length ?
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-start sm:gap-x-2 sm:gap-y-4 md:grid-cols-3">
                    {props.recipes.map(e => <Recipe key={e.recipe._id} avgRating={e.recipe.avgRating} images={e.recipe.images} title={e.recipe.title} totalTime={e.recipe.totalTime} user={e.recipe.user} _id={e.recipe._id} />)}
                </ul>
                :
                <p className="text-center text-slate-500">Have no favourite recipes yet</p>
            }
        </div>
    )
}

export default FavouriteRecipes