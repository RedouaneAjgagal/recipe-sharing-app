import RecipeForm from './RecipeForm';

interface Props {
    for: "newRecipe" | "updateRecipe"
}

const RecipeFormContainer = (props: React.PropsWithoutRef<Props>) => {

    return (
        <section className='flex flex-col gap-4 p-4'>
            <h1 className='text-3xl font-medium mb-2'>
                {props.for === "newRecipe" ? "New Recipe" : "Update Recipe"}
            </h1>
            <RecipeForm for={props.for} />
        </section>
    )
}

export default RecipeFormContainer