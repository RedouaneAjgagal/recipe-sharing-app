import { useState } from "react"
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
    const openProfileHandler = () => {
        setIsProfileOpen(prev => !prev);
    }

    return (
        <div className="relative">
            <button onClick={openProfileHandler} className="flex items-center gap-2">
                <img className="w-full max-w-[2.5rem] h-[2.5rem] object-cover rounded-full" src={props.userInfo.picture} alt={`${props.userInfo.name}'s picture`} />
                <AiFillCaretDown className={`duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>
            {isProfileOpen ?
                <ul className="flex flex-col absolute right-0 -bottom-[9.5rem] bg-white rounded border shadow-xl font-medium text-slate-700 w-44">
                    <li><a href="/porfile" className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineUser />Profile</a></li>
                    <li><a href="/porfile/settings" className="flex items-center gap-1 border-b py-3 px-4"><AiOutlineSetting />Settings</a></li>
                    <li><a href="/logout" className="flex items-center gap-1 py-3 px-4 text-red-600"><AiOutlineUpload className="rotate-90" />Sign out</a></li>
                </ul> : null}
        </div>
    )
}

export default UserNavbar