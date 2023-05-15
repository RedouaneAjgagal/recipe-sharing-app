import Input from "../Input"
import { UMethods } from "../../pages/Recipe";

interface Props {
    value?: UMethods
}

const Method = (props: React.PropsWithoutRef<Props>) => {
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
        </div>
    )
}

export default Method