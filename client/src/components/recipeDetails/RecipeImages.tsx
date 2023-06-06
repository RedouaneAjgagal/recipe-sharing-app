import { useState } from "react"
import RecipeImage from "./RecipeImage"
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"

interface Props {
    images: string[]
}

const RecipeImages = (props: React.PropsWithoutRef<Props>) => {
    const [curSlide, setCurSlide] = useState(0);

    const nextHandler = () => {
        if ((curSlide + 1) === props.images.length) {
            return;
        }
        setCurSlide(prev => prev + 1);
    }
    const prevHandler = () => {
        if (curSlide === 0) {
            return; 
        }
        setCurSlide(prev => prev - 1);
    }

    return (
        <div className="relative md:order-1">
            <div className="w-full max-w-full h-full min-h-[16rem] relative overflow-hidden sm:min-h-[30rem] md:min-h-[20rem]">
                {props.images.map((image, index) => <RecipeImage src={image} key={index} index={index} currentSlide={curSlide} />)}
            </div>
            {curSlide !== 0 && <button onClick={prevHandler} className="text-3xl  absolute left-3 top-1/2 -translate-y-1/2 shadow-sm rounded-full bg-white"><BsFillArrowLeftCircleFill className="text-amber-600" /></button>}
            {curSlide + 1 !== props.images.length && <button onClick={nextHandler} className="text-3xl  absolute right-3 top-1/2 -translate-y-1/2 shadow-sm rounded-full bg-white"><BsFillArrowRightCircleFill className="text-amber-600" /></button>}
        </div>
    )
}

export default RecipeImages