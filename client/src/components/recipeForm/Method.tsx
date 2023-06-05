import Input from "../Input"
import { UMethods } from "../../pages/Recipe";
import { AiFillDelete } from "react-icons/ai";

interface Props {
    value?: UMethods;
    index: number;
    onRemoveMethod: (methodId: string) => void;
    methodId: string;
}

const Method = (props: React.PropsWithoutRef<Props>) => {

    const onRemoveMethod = () => {
        props.onRemoveMethod(props.methodId);
    }

    return (
        <div className='bg-gray-200/50 p-3 rounded flex flex-col gap-3'>
            <div>
                <label className="text-lg font-medium text-amber-800">Title</label>
                <Input name='methodTitle' placeHolder='E.g. Make the meatball mixture' type='text' success={true} value={props.value?.title} />
            </div>
            <div className="flex flex-col">
                <label className="text-lg font-medium text-amber-800">Method</label>
                <textarea name="method" autoComplete="off" placeholder="Share your method" className="w-full resize-none min-h-full h-20 px-3 py-2 border border-gray-300 rounded" defaultValue={props.value ? props.value?.sub : undefined}></textarea>
            </div>
            {props.index > 0 ?
                <div className="flex justify-end font-medium text-xl text-red-500">
                    <button type="button" onClick={onRemoveMethod} className="px-1">
                        <AiFillDelete />
                    </button>
                </div>
                :
                null
            }
        </div>
    )
}

export default Method