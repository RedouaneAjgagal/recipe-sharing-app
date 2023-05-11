import Method from "./Method"
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const MethodsList = () => {

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
                {methods.map(method => method)}
                <button type="button" onClick={addMethodHandler} className="flex items-center justify-center text-slate-200 bg-slate-800/90 font-medium rounded py-[0.35rem]"><AiOutlinePlus /> Add New Method</button>
            </div>
        </>
    )
}

export default MethodsList