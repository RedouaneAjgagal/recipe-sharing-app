import { useSearchParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import getSingleRecipe from '../../fetchers/getSingleRecipe';
import { URecipeDetails } from '../../pages/Recipe';
import { useQuery } from '@tanstack/react-query';

interface Props {
    for: "newRecipe" | "updateRecipe"
}

const RecipeFormContainer = (props: React.PropsWithoutRef<Props>) => {

    const [searchParams] = useSearchParams();
    const recipeId = searchParams.get("recipeId");

    const updateQuery = props.for === "updateRecipe" ? useQuery({
        queryKey: ["recipe", { recipeId }],
        queryFn: () => getSingleRecipe(recipeId!),
        refetchOnWindowFocus: false
    }) : null;


    return (
        <section className='flex flex-col gap-4 p-4'>
            <h1 className='text-3xl font-medium mb-2'>
                {props.for === "newRecipe" ? "New Recipe" : "Update Recipe"}
            </h1>
            {props.for === "updateRecipe" && updateQuery!.isSuccess && <RecipeForm for={props.for} recipeDetails={updateQuery!.data as URecipeDetails} recipeId={recipeId} />}
            {props.for === "newRecipe" && <RecipeForm for={props.for} />}

        </section>
    )
}

export default RecipeFormContainer