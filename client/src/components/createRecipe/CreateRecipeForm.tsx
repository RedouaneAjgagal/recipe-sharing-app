import { useFetcher } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';

const CreateRecipeForm = () => {
    const fetcher = useFetcher();
    return (
        <fetcher.Form method='POST' encType='multipart/form-data'>
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
            <div className='mb-4 flex flex-col justify-center'>
                <h2 className='text-2xl font-medium text-slate-700/90 mt-7 mb-5'>Image</h2>
                <label htmlFor="images" className="font-medium text-slate-600">Choose an image for your recipe:</label>
                <input type="file" name="images" id="images" accept="image/*" className='py-2' multiple />
            </div>
            <CallToAction />
        </fetcher.Form>
    )
}

export default CreateRecipeForm