import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { UUser } from "../pages/Root";
import { useMutation, useQuery } from "@tanstack/react-query";


const Navbar = () => {

    const authQuery = useQuery(["authentication"]);
    const authData = authQuery.data as { user: UUser };

    const mutation = useMutation(["logout"]);
    const logoutHandler = () => {
        mutation.mutate();
    }

    return (
        <nav className="flex items-center justify-between p-4 rounded shadow-sm bg-white lg:px-10">
            <Link to={"/"} className="text-gray-800 text-lg font-bold ">Sharing Recipe</Link>
            {authQuery.isSuccess ?
                <UserNavbar userInfo={authData.user} onLogout={logoutHandler} />
                :
                <div className="flex gap-2 ">
                    <Link to="/login" className="px-2 py-[.15rem] rounded font-medium text-gray-800">Log In</Link>
                    <Link to="/register" className="px-2 py-[.15rem] rounded font-medium bg-[#FFEBCC] text-black border border-[#FFC877]">Sign Up</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar