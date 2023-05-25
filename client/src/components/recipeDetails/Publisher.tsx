import { Link } from "react-router-dom";

interface Props {
    publisher: {
        _id: string;
        name: string;
        picture: string;
    },
    updatedAt: Date
}

const Publisher = (props: React.PropsWithoutRef<Props>) => {

    const updatedAt = new Date(props.updatedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "2-digit" });

    return (
        <div className="flex items-center gap-3 text-sm">
            <div className="w-11 h-11">
                <img src={props.publisher.picture} alt={`${props.publisher.name}'s profile picture`} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col gap-[0.15rem]">
                <Link to={`/users/${props.publisher._id}`} className="text-[#565656] font-medium">By <span className="text-amber-950 font-medium tracking-wider underline underline-offset-2">{props.publisher.name.toUpperCase()}</span></Link>
                <p className="text-slate-500">Updated {updatedAt}</p>
            </div>
        </div>
    )
}

export default Publisher