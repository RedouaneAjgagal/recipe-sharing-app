import { Link, useLoaderData, useRouteLoaderData, useNavigate } from 'react-router-dom'
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
import url from '../../config/url';
import { AiOutlinePlus } from "react-icons/ai"
import { ImSpinner2 } from "react-icons/im";
import postRecipe from '../../fetchers/postRecipe';
import updateRecipe from '../../fetchers/updateRecipe';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
    for: "newRecipe" | "updateRecipe"
}

const CreateRecipeForm = (props: React.PropsWithoutRef<Props>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{ errors: UErrorsForm } | null>(null);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const errorsData = formErrors?.errors;


    const recipeDetails = useLoaderData() as URecipeDetails;
    const [recipesImgs, setRecipeImgs] = useState<string[] | undefined>(recipeDetails?.recipe?.images);

    const user = useRouteLoaderData("user") as UUser;
    const removeImgHandler = (value: string) => {
        setRecipeImgs(images => {
            const updatedImages = images?.filter(img => img !== value);
            return updatedImages
        })
    }

    const addImagesHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = e.currentTarget.files;
        const isLimited = e.currentTarget.files!.length + recipesImgs!.length > 3;
        if (!images || images.length < 1) {
            return;
        }
        if (isLimited) {
            return;
        }
        for (let i = 0; i < images.length; i++) {
            const image = images.item(i)!;
            const maxSize = 1024 * 1024;
            if (image.size > maxSize || !image.type.startsWith("image")) {
                return;
            }
            setIsLoading(true);
            const formData = new FormData();
            formData.append("images", image);
            const response = await fetch(`${url}/recipes/upload-images`, {
                method: "POST",
                credentials: "include",
                body: formData
            });
            const data = await response.json();
            const src: string[] = data.src;
            setRecipeImgs(imgs => {
                return imgs?.concat(src[0]);
            });
            setIsLoading(false);
            e.target.value = "";
        }
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

    const mutation = useMutation({
        mutationFn: props.for === "newRecipe" ? postRecipe : updateRecipe,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["recipes"]);
            if (data?.errors) {
                setFormErrors({ errors: data.errors });
                return;
            }
            props.for === "newRecipe" ? navigate("/?sort=newest") : navigate("..");
        }
    });

    const postCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate(formData);
    }

    return (
        <>
            {mutation.isError && <StatusResponse success={false} message={(mutation.error as Error).message} />}
            <form onSubmit={postCommentHandler} encType='multipart/form-data' className={`${props.for === "updateRecipe" ? "mb-16" : "mb-0"}`}>
                {recipesImgs ?
                    <div className='pb-7'>
                        <div className='flex gap-4'>
                            {recipesImgs.map(img => <RecipeImage key={crypto.randomUUID()} src={img} onRemove={removeImgHandler} length={recipesImgs.length} />)}
                            <input type="text" hidden value={recipesImgs} name='images' readOnly />
                            <div className='flex justify-center items-center'>
                                <label htmlFor="addImages" className='cursor-pointer'>
                                    {recipesImgs.length < 3 && (isLoading ? <ImSpinner2 className="text-2xl animate-spin" /> : <AiOutlinePlus className="text-2xl" />)}
                                    <input type="file" className='sr-only' id='addImages' onChange={addImagesHandler} accept='image/*' multiple disabled={isLoading} />
                                </label>
                            </div>
                        </div>
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
            </form>
        </>
    )
}

export default CreateRecipeForm