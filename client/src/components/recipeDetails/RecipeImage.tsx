interface Props {
    src: string;
    index: number;
    currentSlide: number;
}

const RecipeImage = (props: React.PropsWithoutRef<Props>) => {
    const translateX = (props.index - props.currentSlide) * 100;

    return (
        <div style={{ transform: `translateX(${translateX}%)` }} className="w-full max-w-full h-full absolute duration-500">
            <img src={props.src} alt="recipe" className="rounded w-full h-full object-cover" />
        </div>
    )
}

export default RecipeImage