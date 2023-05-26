import { BiX } from "react-icons/bi";

interface Props {
    src: string;
    onRemove: (value: string) => void;
    length: number;
}

const RecipeImage = (props: React.PropsWithoutRef<Props>) => {
    const removeImgHandler = () => {
        props.onRemove(props.src);
    }
    return (
        <div className="h-[5rem] w-full max-w-[5rem] relative">
            <img src={props.src} alt="a meal" className="h-full w-full object-cover rounded shadow-md" />
            {props.length > 1 ? <button type="button" onClick={removeImgHandler} className="bg-white text-black text-lg p-1 rounded-full flex absolute -top-2 -right-2"><BiX /></button> : null}
        </div>
    )
}

export default RecipeImage