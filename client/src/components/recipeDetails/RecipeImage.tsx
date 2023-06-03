interface Props {
    src: string;
    index: number;
    currentSlide: number;
}

const RecipeImage = (props: React.PropsWithoutRef<Props>) => {
    const translateX = (props.index - props.currentSlide) * 100;

    // let work;
    // if (props.index === 0 && props.currentSlide === 1) {
    //     work = `translate-x-[200%]`
    // } else {
    //     work = `translate-x-[${translateX}%]`
    // }

    return (
        <div className={`translate-x-[${translateX}%] w-full max-w-full h-full absolute duration-500`}>
            <img src={props.src} alt="recipe" className="rounded w-full h-full object-cover" />
        </div>
        // translateX={`translate-x-[${((index - curSlide) * 100)}%]`}
    )
}

export default RecipeImage