import { URecipeDetails } from "../../pages/Recipe"
import RecipeImages from "./RecipeImages"
import RecipeStats from "./RecipeStats"
import Ingredients from "./Ingredients"
import Methods from "./Methods"
import RecipeDetailsNav from "./RecipeDetailsNav";

interface Props {
    recipeDetails: URecipeDetails
}

const RecipeDetails = (props: React.PropsWithoutRef<Props>) => {

    const ingredients = props.recipeDetails.recipe.ingredients.flatMap(item => item.sub).length.toString().padStart(2, "0");
    const methods = props.recipeDetails.recipe.methods.length.toString().padStart(2, "0");
    const totalTime = props.recipeDetails.recipe.totalTime.toString().padStart(2, "0");

    const prepTime = props.recipeDetails.recipe.preparationTime.toString().padStart(2, "0");
    const cookTime = props.recipeDetails.recipe.cookTime.toString().padStart(2, "0");

    return (
        <article className="py-6 flex flex-col gap-6 text-[#535353] leading-relaxed">
            <RecipeDetailsNav avgRating={props.recipeDetails.recipe.avgRating} publisher={props.recipeDetails.user} updatedAt={props.recipeDetails.recipe.updatedAt} recipeId={props.recipeDetails.recipe._id} isFavourited={props.recipeDetails.recipe.isFavourited} />
            <RecipeImages images={props.recipeDetails.recipe.images} />
            <h1 className="text-3xl text-slate-800 font-medium tracking-wide">{props.recipeDetails.recipe.title}</h1>
            <RecipeStats stats={{ ingredients, methods, totalTime }} />
            <hr className="border-slate-800/25 my-4" />
            {props.recipeDetails.recipe.description &&
                <section className="flex flex-col gap-4">
                    <h2 className="text-2xl text-slate-700 font-medium tracking-wide">Description</h2>
                    <p>{props.recipeDetails.recipe.description}</p>
                </section>
            }
            {props.recipeDetails.recipe.note &&
                <div className="mb-4">
                    <p className="text-[#b9740c] underline underline-offset-4"><span className="text-[#754600] font-medium">NOTE: </span>{props.recipeDetails.recipe.note}</p>
                </div>
            }
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 bg-[#FFEBCC] py-1">
                    <span className="font-bold tracking-wide text-[#855C0C] ml-[30%]">PREP TIME</span>
                    <span className="font-medium ml-[30%]">{prepTime} mins</span>
                </div>
                <div className="grid grid-cols-2 bg-[#FFF0D9] py-1">
                    <span className="font-bold tracking-wide text-[#855C0C] ml-[30%]">COOK TIME</span>
                    <span className="font-medium ml-[30%]">{cookTime} mins</span>
                </div>
                <div className="grid grid-cols-2 bg-[#FFF2DF] py-1">
                    <span className="font-bold tracking-wide text-[#855C0C] ml-[30%]">TOTAL TIME</span>
                    <span className="font-medium ml-[30%]">{totalTime} mins</span>
                </div>
            </div>
            <Ingredients ingredients={props.recipeDetails.recipe.ingredients} />
            <Methods methods={props.recipeDetails.recipe.methods} />
        </article>
    )
}

export default RecipeDetails