interface Props {
    label: string
    value: string
    type: string
    readOnly?: boolean
}
const InputContainer = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div>
            <label className="text-black font-medium" htmlFor={props.label}>{props.label}</label>
            {props.type === "texterea" ?
                <textarea id={props.label} name={props.label} autoComplete='off' defaultValue={props.value} className={`w-full resize-none border border-slate-300 rounded-sm p-2  min-h-[8rem] text-slate-600 mt-1`} maxLength={300} />
                :
                <input className={`${props.readOnly && "bg-gray-300/50 cursor-not-allowed"} w-full p-2 border border-slate-300 rounded-sm mt-1 text-slate-600`} name={props.label} id={props.label} type={props.type} defaultValue={props.value} readOnly={props.readOnly ? true : false} />
            }
        </div>
    )
}

export default InputContainer