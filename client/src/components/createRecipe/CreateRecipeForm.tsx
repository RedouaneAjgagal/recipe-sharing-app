import { useFetcher } from 'react-router-dom'
import Input from '../Input';
import NoteInput from './NoteInput';
import IngredientsList from './IngredientsList';
import MethodsList from './MethodsList';
import CallToAction from './CallToAction';
import { UErrorsForm } from '../../pages/NewPrecipe';
import StatusResponse from '../StatusResponse';
import UploadImage from './UploadImage';

const CreateRecipeForm = () => {
    const fetcher = useFetcher();
    const errorsData = fetcher.data?.errors as UErrorsForm;
    const responseData = fetcher.data?.response as { msg: string, success: boolean };
    return (
        <>
            {responseData?.msg && <StatusResponse success={responseData?.success} message={responseData?.msg} />}
            <fetcher.Form method='POST' encType='multipart/form-data'>
                <div className='pb-7 relative'>
                    <Input name='title' placeHolder='Title' type='text' success={errorsData?.title ? false : true} />
                    {errorsData?.title && <span className="absolute bottom-2 left-0 text-sm text-red-700">Title is required</span>}
                </div>
                <div className='pb-7'>
                    <Input name='description' placeHolder='Description' type='text' success={true} />
                </div>
                <div className='flex gap-2'>
                    <div className='pb-7 relative'>
                        <Input name='prepTime' placeHolder='Preparation time' type='number' success={errorsData?.prepTime ? false : true} />
                        {errorsData?.prepTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                    <div className='pb-7 relative'>
                        <Input name='cookTime' placeHolder='Cook time' type='number' success={errorsData?.cookTime ? false : true} />
                        {errorsData?.cookTime && <span className="absolute bottom-2 left-0 text-sm text-red-700">Provide a valid number</span>}
                    </div>
                </div>
                <NoteInput />
                <IngredientsList errors={errorsData?.ingredients} />
                <MethodsList errors={errorsData?.methods} />
                <UploadImage errorMsg={errorsData?.images} />
                <CallToAction />
            </fetcher.Form>
        </>
    )
}

export default CreateRecipeForm