
interface Props {
    publisher: {
        name: string;
        picture: string;
    },
    updatedAt: Date
}

const Publisher = (props: React.PropsWithoutRef<Props>) => {

    const updatedAt = new Date(props.updatedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "2-digit" });

    return (
        <div className="flex items-center py-2 px-3 gap-3 rounded-xl border shadow-sm">
            <div><img src={props.publisher.picture} alt={`${props.publisher.name}'s profile picture`} className="w-full max-w-[3rem] rounded-full" /></div>
            <div>
                <h5 className="text-[#565656] font-medium">By <span className="text-black font-medium">{props.publisher.name.toUpperCase()}</span></h5>
                <p className="text-slate-500">Updated {updatedAt}</p>
            </div>
        </div>
    )
}

export default Publisher