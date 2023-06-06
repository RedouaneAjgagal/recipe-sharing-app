interface Props {
    title: string;
    time: string;
}

const Times = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="grid grid-cols-2 bg-[#FFEBCC] py-1 md:grid-cols-1 md:py-2 md:px-6">
            <span className="font-bold tracking-wide text-[#855C0C] ml-[30%] md:ml-0">{props.title}</span>
            <span className="font-medium ml-[30%] md:ml-0">{props.time} mins</span>
        </div>
    )
}

export default Times