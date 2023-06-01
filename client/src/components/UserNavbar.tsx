import { useState } from "react"
import { Link } from "react-router-dom";
import { AiFillCaretDown, AiOutlineUser, AiOutlineSetting, AiOutlineUpload } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import logout from "../fetchers/logout";

interface Props {
    userInfo: {
        _id: string;
        name: string;
        picture: string;
    }
}

const UserNavbar = (props: React.PropsWithoutRef<Props>) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const queryClient = useQueryClient();

    const openProfileHandler = () => {
        setIsProfileOpen(prev => !prev);
    }

    const closeProfile = () => {
        setIsProfileOpen(false);
    }

    queryClient.setMutationDefaults(["logout"], {
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("exp");
            queryClient.invalidateQueries(["recipeComments"]);
            queryClient.invalidateQueries(["authentication"]);
        }
    });

    const mutation = useMutation({ mutationKey: ["logout"] });
    const logoutHandler = () => {
        mutation.mutate();
        closeProfile();
    }

    return (
        <div className="relative">
            <button onClick={openProfileHandler} className="flex items-center gap-2">
                <img className="w-full max-w-[2.5rem] h-[2.5rem] object-cover rounded-full" src={props.userInfo.picture} alt={`${props.userInfo.name}'s picture`} />
                <AiFillCaretDown className={`duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>
            {isProfileOpen ?
                <ul className="flex flex-col absolute right-0 -bottom-[13rem] bg-white rounded border shadow-xl font-medium text-slate-700 w-44 z-50">
                    <li>
                        <Link to="/profile" onClick={closeProfile} className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineUser />Profile</Link>
                    </li>
                    <li>
                        <Link to="/profile/recipes" onClick={closeProfile} className="flex items-center gap-1 border-b py-3 px-4"><BiFoodMenu />My Recipes</Link>
                    </li>
                    <li>
                        <Link to="/profile/settings" onClick={closeProfile} className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineSetting />Settings</Link>
                    </li>
                    <li>
                        <button onClick={logoutHandler} className="flex items-center gap-1 py-3 px-4 text-red-600 w-full"><AiOutlineUpload className="rotate-90" />Sign out</button>
                    </li>
                </ul> : null}
        </div>
    )
}

export default UserNavbar