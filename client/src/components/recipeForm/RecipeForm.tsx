import { useFetcher } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';
import { UErrorsForm } from '../../pages/NewPrecipe';
import StatusResponse from '../StatusResponse';
import UploadImage from './UploadImage';
import { useRouteLoaderData } from 'react-router-dom';
import { URecipeDetails } from '../../pages/Recipe';

interface Props {
    for: "newRecipe" | "updateRecipe"
}

const CreateRecipeForm = (props: React.PropsWithoutRef<Props>) => {
    const fetcher = useFetcher();
    const errorsData = fetcher.data?.errors as UErrorsForm;
    const responseData = fetcher.data?.response as { msg: string, success: boolean };

    const recipeDetails = (useRouteLoaderData("recipeDetails") as { recipeDetails: URecipeDetails })?.recipeDetails.recipe;

    return (
        <>
            {responseData?.msg && <StatusResponse success={responseData?.success} message={responseData?.msg} />}
            <fetcher.Form method='POST' encType='multipart/form-data'>
                <div className='pb-7 relative'>
                    <Input name='title' placeHolder='Title' type='text' success={errorsData?.title ? false : true} value={props.for === "updateRecipe" ? recipeDetails.title : undefined} />
                    {errorsData?.title && <span className="absolute bottom-2 left-0 text-sm text-red-700">Title is required</span>}
                </div>
                <div className='pb-7'>
                    <Input name='description' placeHolder='Description' type='text' success={true} value={props.for === "updateRecipe" ? recipeDetails.description : undefined} />
                </div>
                <div className='flex gap-2'>
                    <div className='pb-7 relative'>
                        <Input name='prepTime' placeHolder='Preparation time' type='number' success={errorsData?.prepTime ? false : true} value={props.for === "updateRecipe" ? recipeDetails.preparationTime : undefined} />
                        {errorsData?.prepTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                    <div className='pb-7 relative'>
                        <Input name='cookTime' placeHolder='Cook time' type='number' success={errorsData?.cookTime ? false : true} value={props.for === "updateRecipe" ? recipeDetails.cookTime : undefined} />
                        {errorsData?.cookTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                </div>
                <NoteInput value={props.for === "updateRecipe" ? recipeDetails.note : undefined} />
                <IngredientsList errors={errorsData?.ingredients} ingredients={props.for === "updateRecipe" ? recipeDetails.ingredients : undefined} />
                <MethodsList errors={errorsData?.methods} />
                <UploadImage errorMsg={errorsData?.images} />
                <CallToAction />
            </fetcher.Form>
        </>
    )
}

export default CreateRecipeForm