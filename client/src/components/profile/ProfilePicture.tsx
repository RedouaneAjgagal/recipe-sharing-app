import { Link } from "react-router-dom";

interface Props {
    picture: string;
    name: string;
    readonly?: boolean
}

const ProfilePicture = (props: React.PropsWithoutRef<Props>) => {
    
    return (
        <div className="w-32 h-32 m-auto relative text-center">
            <img className="w-full h-full object-cover rounded-full" src={props.picture} alt={`${props.name}'s profile picture`} />
            {!props.readonly ?
                <Link to={"settings"} className="font-medium text-sm bg-amber-600 text-white py-1 rounded absolute w-4/5 left-1/2 -translate-x-1/2 bottom-0">EDIT PROFILE</Link>
                : null
            }
        </div>
    )
}

export default ProfilePicture