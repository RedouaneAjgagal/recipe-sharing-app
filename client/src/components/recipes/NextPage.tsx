import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const NextPage = () => {
  return (
    <Link to={"/"} className="flex items-center gap-1 font-medium p-3 w-full text-[0.9rem] justify-end">Next <BsArrowRightShort className="mt-1" /></Link>
  )
}

export default NextPage