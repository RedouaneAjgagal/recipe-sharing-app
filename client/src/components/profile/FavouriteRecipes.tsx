import Recipe, { URecipe } from "../recipes/Recipe";

interface Props {
    recipes: { recipe: URecipe }[];
}

const FavouriteRecipes = (props: React.PropsWithoutRef<Props>) => {

    return (
        <div className='p-7'>
            <h2 className='font-medium text-center tracking-wider mb-5'>FAVOURITE RECIPES</h2>
            {props.recipes.length ?
                <ul>
                    {props.recipes.map(e => <Recipe key={e.recipe._id} avgRating={e.recipe.avgRating} images={e.recipe.images} title={e.recipe.title} totalTime={e.recipe.totalTime} user={e.recipe.user} _id={e.recipe._id} />)}
                </ul>
                :
                <p className="text-center text-slate-500">Have no favourite recipes yet</p>    
        }
        </div>
    )
}

export default FavouriteRecipes