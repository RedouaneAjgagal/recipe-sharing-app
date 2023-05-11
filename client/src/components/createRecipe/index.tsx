import CreateRecipeForm from './CreateRecipeForm';

const CreateRecipe = () => {


    return (
        <section className='flex flex-col gap-4'>
            <h1 className='text-3xl font-medium mb-2'>New Recipe</h1>
            <CreateRecipeForm />
        </section>
    )
}

export default CreateRecipe