import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const PreviousPage = () => {
    return (
        <Link to={"/"} className="flex items-center gap-1 font-medium p-3 w-full text-[.9rem]"><BsArrowLeftShort className="mt-[.15rem]" /> Previous</Link>
    )
}

export default PreviousPage