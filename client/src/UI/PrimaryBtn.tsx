

interface Props {
    style: "black" | "white" | "orange"
    onClick?: () => void
    disabled?: boolean
}


const PrimaryBtn = (props: React.PropsWithChildren<Props>) => {
    let styles = "bg-gray-800 text-white";
    if (props.style === "white") styles = "text-gray-800";
    if (props.style === "orange") styles = "bg-[#FFEBCC] text-black border border-[#FFC877]";
    return (
        <div className={`${styles} w-full flex justify-center items-center rounded`}>
            <button disabled={props.disabled ? props.disabled : false} onClick={props.onClick} className={`px-2 py-[.15rem] gap-1 font-medium w-full flex justify-center`}>{props.children}</button>
        </div>
    )
}

export default PrimaryBtn;