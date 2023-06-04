import { Link, useNavigate, } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';
import { UErrorsForm } from '../../pages/NewPrecipe';
import StatusResponse from '../StatusResponse';
import UploadImage from './UploadImage';
import { URecipeDetails } from '../../pages/Recipe';
import { useState } from "react";
import postRecipe from '../../features/postRecipe';
import updateRecipe from '../../features/updateRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
    for: "newRecipe" | "updateRecipe";
    recipeDetails?: URecipeDetails;
    recipeId?: string | null;
    userId?: string
}

const CreateRecipeForm = (props: React.PropsWithoutRef<Props>) => {
    const [formErrors, setFormErrors] = useState<{ errors: UErrorsForm } | null>(null);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // if the current user is not recipe publisher
    if (props.for === "updateRecipe" && props.recipeDetails?.recipe.user !== props.userId) {
        return (<>
            <h2 className='text-xl text-red-600'>Forbiden</h2>
            <div>
                <Link to="/" className='bg-slate-800 text-white font-medium py-1 px-2 rounded'>Home Page</Link>
            </div>
        </>)
    }

    const mutation = useMutation({
        mutationFn: props.for === "newRecipe" ? postRecipe : updateRecipe,
        onSuccess: (data) => {
            if (data?.errors) {
                setFormErrors({ errors: data.errors });
                return;
            }
            queryClient.invalidateQueries(["recipe", { recipeId: props.recipeId }]);
            props.for === "newRecipe" ? navigate("/?sort=newest") : navigate("..");
        }
    });
    const errorsData = formErrors?.errors;

    const postCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
    }

    const onImageLoading = (isLoading: boolean) => {
        setIsImageLoading(isLoading);
    }

    return (
        <>
            {mutation.isError && <StatusResponse success={false} message={(mutation.error as Error).message} />}
            <form onSubmit={postCommentHandler} encType='multipart/form-data' className={`${props.for === "updateRecipe" ? "mb-16" : "mb-0"}`}>
                {props.for === "updateRecipe" &&
                    <div className='pb-7'>
                        <UploadImage recipeImages={props.recipeDetails!.recipe.images} isLoading={isImageLoading} isImageLoading={onImageLoading} />
                    </div>
                }
                <div className='pb-7 relative'>
                    <Input name='title' placeHolder='Title' type='text' success={errorsData?.title ? false : true} value={props.for === "updateRecipe" ? props.recipeDetails?.recipe.title : undefined} />
                    {errorsData?.title && <span className="absolute bottom-2 left-0 text-sm text-red-700">Title is required</span>}
                </div>
                <div className='pb-7'>
                    <Input name='description' placeHolder='Description' type='text' success={true} value={props.for === "updateRecipe" ? props.recipeDetails?.recipe.description : undefined} />
                </div>
                <div className='flex gap-2'>
                    <div className='pb-7 relative'>
                        <Input name='prepTime' placeHolder='Preparation time' type='number' success={errorsData?.prepTime ? false : true} value={props.for === "updateRecipe" ? props.recipeDetails?.recipe.preparationTime : undefined} />
                        {errorsData?.prepTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                    <div className='pb-7 relative'>
                        <Input name='cookTime' placeHolder='Cook time' type='number' success={errorsData?.cookTime ? false : true} value={props.for === "updateRecipe" ? props.recipeDetails?.recipe.cookTime : undefined} />
                        {errorsData?.cookTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                </div>
                <NoteInput value={props.for === "updateRecipe" ? props.recipeDetails?.recipe.note : undefined} />
                <IngredientsList errors={errorsData?.ingredients} ingredients={props.for === "updateRecipe" ? props.recipeDetails?.recipe.ingredients : undefined} />
                <MethodsList errors={errorsData?.methods} methods={props.for === "updateRecipe" ? props.recipeDetails?.recipe.methods : undefined} />
                {props.for === "newRecipe" &&
                    <div className=' flex flex-col justify-center relative gap-4 pt-4'>
                        <h2 className='text-2xl font-medium text-slate-700/90'>Image</h2>
                        <label htmlFor="addImages" className="font-medium text-slate-600">Choose images for your recipe:</label>
                        <div className='relative pb-6'>
                            <UploadImage recipeImages={[]} isLoading={isImageLoading} isImageLoading={onImageLoading} />
                            {errorsData?.isInvalidImg && <span className="absolute bottom-0 left-0 text-sm text-red-700">Provide a valid image</span>}
                            
                        </div>
                    </div>}
                <CallToAction for={props.for} isSubmitting={mutation.isLoading} disabled={isImageLoading} />
            </form>
        </>
    )
}

export default CreateRecipeForm