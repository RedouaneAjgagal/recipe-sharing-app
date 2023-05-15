import Method from "./Method"
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";


interface Props {
    errors?: boolean
}

const MethodsList = (props: React.PropsWithoutRef<Props>) => {

    const [methods, setMethods] = useState([<Method key={0} />]);

    const addMethodHandler = () => {
        const id = crypto.randomUUID();
        setMethods((prev) => {
            return [...prev, <Method key={id} />]
        });
    }

    return (
        <>
            <h2 className='text-2xl font-medium text-slate-700/90 mt-7 mb-5'>Methods</h2>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex flex-col gap-6 relative pb-6">
                    {methods.map(method => method)}
                    {props.errors && <span className="absolute bottom-0 left-0 text-sm text-red-700">Please fill out all the methods</span>}
                </div>
                <button type="button" onClick={addMethodHandler} className="flex items-center justify-center text-slate-200 bg-slate-800/90 font-medium rounded py-[0.35rem]"><AiOutlinePlus /> Add New Method</button>
            </div>
        </>
    )
}

export default MethodsList