import { useFetcher } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';

const CreateRecipeForm = () => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method='POST'>
            <div className='pb-7'>
                <Input name='title' placeHolder='Title' type='text' success={true} />
            </div>
            <div className='pb-7'>
                <Input name='description' placeHolder='Description' type='text' success={true} />
            </div>
            <div className='pb-7 flex gap-2'>
                <Input name='prepTime' placeHolder='Preparation time' type='number' success={true} />
                <Input name='cookTime' placeHolder='Cook time' type='number' success={true} />
            </div>
            <NoteInput />
            <IngredientsList />
            <MethodsList />
            <CallToAction />
        </fetcher.Form>
    )
}

export default CreateRecipeForm