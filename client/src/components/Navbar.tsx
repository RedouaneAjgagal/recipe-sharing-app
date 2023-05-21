import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
    const authentication = useAuthentication();

    return (
        <nav className="flex items-center justify-between px-4 py-6 border-b-[1px]">
            <Link to={"/"} className="text-gray-800 text-lg font-bold ">Sharing Recipe</Link>
            {authentication ?
                <UserNavbar userInfo={authentication.user} />
                :
                <div className="flex gap-2">
                    <Link to="/login" className="px-2 py-[.15rem] rounded font-medium text-gray-800">Log In</Link>
                    <Link to="/register" className="px-2 py-[.15rem] rounded font-medium bg-[#FFEBCC] text-black border border-[#FFC877]">Sign Up</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar