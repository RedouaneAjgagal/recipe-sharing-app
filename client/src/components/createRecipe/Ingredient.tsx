import Input from "../Input"

interface Props {
    nameId: number
}

const Ingredient = (props: React.PropsWithoutRef<Props>) => {
    const name = `ingredient-${props.nameId}`
    return (
        <div>
            <Input name={name} placeHolder='Ingredient' type='text' success={true} />
        </div>
    )
}

export default Ingredient