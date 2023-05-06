

interface Props {
    style: "black" | "white" | "orange"
    onClick: () => void
}


const PrimaryBtn = (props: React.PropsWithChildren<Props>) => {
    let styles = "bg-gray-800 text-white";
    if (props.style === "white") styles = "text-gray-800";
    if (props.style === "orange") styles = "bg-[#FFEBCC] text-black border border-[#FFC877]";
    return (
        <button onClick={props.onClick} className={`px-2 py-[.15rem] rounded font-medium ${styles}`}>{props.children}</button>
    )
}

export default PrimaryBtn;