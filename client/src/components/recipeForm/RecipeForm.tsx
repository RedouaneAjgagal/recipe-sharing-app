import { Link, useFetcher, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';
import { UErrorsForm } from '../../pages/NewPrecipe';
import StatusResponse from '../StatusResponse';
import UploadImage from './UploadImage';
import { URecipeDetails } from '../../pages/Recipe';
import { UUser } from '../../pages/Root';
import RecipeImage from './RecipeImage';
import { useState } from "react";

interface Props {
    for: "newRecipe" | "updateRecipe"
}

const CreateRecipeForm = (props: React.PropsWithoutRef<Props>) => {
    const fetcher = useFetcher();
    const errorsData = fetcher.data?.errors as UErrorsForm;
    const responseData = fetcher.data?.response as { msg: string, success: boolean };

    const recipeDetails = useLoaderData() as URecipeDetails;

    const user = useRouteLoaderData("user") as UUser;
    const [recipesImgs, setRecipeImgs] = useState<string[] | undefined>(recipeDetails?.recipe?.images);

    // console.log(recipesImgs);

    const removeImgHandler = (value: string) => {
        setRecipeImgs(images => {
            const updatedImages = images?.filter(img => img !== value);
            return updatedImages
        })

    }


    // if the current user is not recipe publisher
    if (props.for === "updateRecipe" && recipeDetails.recipe.user !== user._id) {
        return (<>
            <h2 className='text-xl text-red-600'>Forbiden</h2>
            <div>
                <Link to="/" className='bg-slate-800 text-white font-medium py-1 px-2 rounded'>Home Page</Link>
            </div>
        </>)
    }


    return (
        <>
            {responseData?.msg && <StatusResponse success={responseData?.success} message={responseData?.msg} />}
            <fetcher.Form method={props.for === "newRecipe" ? "POST" : "PATCH"} encType='multipart/form-data' className={`${props.for === "updateRecipe" ? "mb-16" : "mb-0"}`}>
                {recipesImgs ?
                    <div className='flex gap-2 pb-7'>
                        {recipesImgs.map(img => <RecipeImage src={img} onRemove={removeImgHandler} length={recipesImgs.length} />)}
                        <input type="text" hidden value={recipesImgs} name='images' readOnly/>
                    </div>
                    : null}
                <div className='pb-7 relative'>
                    <Input name='title' placeHolder='Title' type='text' success={errorsData?.title ? false : true} value={props.for === "updateRecipe" ? recipeDetails.recipe.title : undefined} />
                    {errorsData?.title && <span className="absolute bottom-2 left-0 text-sm text-red-700">Title is required</span>}
                </div>
                <div className='pb-7'>
                    <Input name='description' placeHolder='Description' type='text' success={true} value={props.for === "updateRecipe" ? recipeDetails.recipe.description : undefined} />
                </div>
                <div className='flex gap-2'>
                    <div className='pb-7 relative'>
                        <Input name='prepTime' placeHolder='Preparation time' type='number' success={errorsData?.prepTime ? false : true} value={props.for === "updateRecipe" ? recipeDetails.recipe.preparationTime : undefined} />
                        {errorsData?.prepTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                    <div className='pb-7 relative'>
                        <Input name='cookTime' placeHolder='Cook time' type='number' success={errorsData?.cookTime ? false : true} value={props.for === "updateRecipe" ? recipeDetails.recipe.cookTime : undefined} />
                        {errorsData?.cookTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                </div>
                <NoteInput value={props.for === "updateRecipe" ? recipeDetails.recipe.note : undefined} />
                <IngredientsList errors={errorsData?.ingredients} ingredients={props.for === "updateRecipe" ? recipeDetails.recipe.ingredients : undefined} />
                <MethodsList errors={errorsData?.methods} methods={props.for === "updateRecipe" ? recipeDetails.recipe.methods : undefined} />
                {props.for === "newRecipe" && <UploadImage errorMsg={errorsData?.images} />}
                <CallToAction for={props.for} />
            </fetcher.Form>
        </>
    )
}

export default CreateRecipeForm