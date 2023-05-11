import Input from "../Input"

const Ingredient = () => {
    return (
        <div>
            <Input name='ingredient' placeHolder='Ingredient' type='text' success={true} />
        </div>
    )
}

export default Ingredient