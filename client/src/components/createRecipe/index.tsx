import { useFetcher } from 'react-router-dom'

const CreateRecipe = () => {

    const fetcher = useFetcher();

    return (
        <fetcher.Form method='POST'>
            <button>create recipe</button>
        </fetcher.Form>
    )
}

export default CreateRecipe