interface Props {
    images: string[]
}


const RecipeImages = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div>
            <img src={props.images[0]} alt="sheesecake" className="rounded" />
        </div>
    )
}

export default RecipeImages