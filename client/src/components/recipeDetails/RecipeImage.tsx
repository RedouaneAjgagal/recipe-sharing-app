interface Props {
    src: string;
    translateX: number;
}

const RecipeImage = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className={`w-full max-w-full h-full absolute duration-500  translate-x-[${props.translateX}%]`}>
            <img src={props.src} alt="recipe" className="rounded w-full h-full object-cover" />
        </div>
    )
}

export default RecipeImage