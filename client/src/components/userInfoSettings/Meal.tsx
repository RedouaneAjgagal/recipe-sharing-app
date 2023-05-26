import { BiX } from "react-icons/bi";

interface Props {
    content: string;
    index: number;
    onRemove: (index: number) => void
}

const Meal = (props: React.PropsWithoutRef<Props>) => {
    const removeHandler = () => {
        props.onRemove(props.index);
    }
    return (
        <div className="relative">
            <span key={crypto.randomUUID()} className="bg-amber-700 text-white rounded py-[0.15rem] px-2">{props.content}</span>
            <button onClick={removeHandler} type="button" className="absolute  rounded-full bg-slate-100 text-black -left-2 -top-2"><BiX /></button>
        </div>
    )
}

export default Meal