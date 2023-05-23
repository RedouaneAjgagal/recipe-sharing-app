import { useState } from "react"
import { Link, useFetcher, useLocation } from "react-router-dom";
import { AiFillCaretDown, AiOutlineUser, AiOutlineSetting, AiOutlineUpload } from "react-icons/ai";

interface Props {
    userInfo: {
        _id: string;
        name: string;
        picture: string;
    };
}

const UserNavbar = (props: React.PropsWithoutRef<Props>) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const fetcher = useFetcher();
    const location = useLocation();
    const openProfileHandler = () => {
        setIsProfileOpen(prev => !prev);
    }

    const logoutHandler = () => {
        const formData = new FormData();
        formData.set("prevPath", location.pathname);
        fetcher.submit(formData, { action: "/profile/logout", method: "POST" });
    }

    return (
        <div className="relative">
            <button onClick={openProfileHandler} className="flex items-center gap-2">
                <img className="w-full max-w-[2.5rem] h-[2.5rem] object-cover rounded-full" src={props.userInfo.picture} alt={`${props.userInfo.name}'s picture`} />
                <AiFillCaretDown className={`duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>
            {isProfileOpen ?
                <ul className="flex flex-col absolute right-0 -bottom-[9.5rem] bg-white rounded border shadow-xl font-medium text-slate-700 w-44 z-50">
                    <li>
                        <Link to="/profile" className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineUser />Profile</Link>
                    </li>
                    <li>
                        <Link to="/profile/settings" className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineSetting />Settings</Link>
                    </li>
                    <li>
                        <button onClick={logoutHandler} className="flex items-center gap-1 py-3 px-4 text-red-600 w-full"><AiOutlineUpload className="rotate-90" />Sign out</button>
                    </li>
                </ul> : null}
        </div>
    )
}

export default UserNavbar