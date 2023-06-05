import Method from "./Method"
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { UMethods } from "../../pages/Recipe";

interface Props {
    errors?: boolean,
    methods?: UMethods[]
}

const MethodsList = (props: React.PropsWithoutRef<Props>) => {

    const removeMethodHandler = (methodId: string) => {
        setMethods(prev => {
            return prev.filter(method => method.key !== methodId);
        });
    }

    const initalMethods = props.methods ? props.methods.map((method, index) => {
        const id = crypto.randomUUID();
        return <Method key={id} methodId={id} index={index} value={method} onRemoveMethod={removeMethodHandler} />
    }) : [<Method key={crypto.randomUUID()} methodId="0" index={0} onRemoveMethod={removeMethodHandler} />]

    const [methods, setMethods] = useState(initalMethods);

    const addMethodHandler = () => {
        const id = crypto.randomUUID();
        setMethods((prev) => {
            return [...prev, <Method key={id} methodId={id} index={prev.length} onRemoveMethod={removeMethodHandler} />]
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