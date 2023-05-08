

interface Props {
    type: "text" | "password" | "email";
    name: string;
    placeHolder: string;
    success: boolean;
}

const Input = (props: React.PropsWithoutRef<Props>) => {
    return (
        <input type={props.type} id={props.name} name={props.name} placeholder={props.placeHolder} className={`border  rounded p-2 w-full ${props.success === false ? "border-red-700" : "border-gray-300"}`} />
    )
}

export default Input