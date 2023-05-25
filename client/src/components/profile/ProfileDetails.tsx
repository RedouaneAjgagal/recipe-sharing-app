import { ProfileData } from "../../pages/Profile";
import ProfilePicture from "./ProfilePicture";
import FavouriteMeals from "./FavouriteMeals";

interface Props {
    profile: ProfileData;
    readonly?: boolean
}

const ProfileDetails = ({ profile, readonly }: React.PropsWithoutRef<Props>) => {
    
    return (
        <section className="bg-white py-8 px-4 rounded text-center flex flex-col gap-4">
            <ProfilePicture picture={profile.picture} name={profile.user.name} readonly={readonly ? true : false} />
            <h1 className="text-xl font-medium tracking-wide">{profile.user.name}</h1>
            <p className="text-slate-500">{profile.bio}</p>
            <FavouriteMeals meals={profile.favouriteMeals} readonly={readonly ? true : false} />
        </section>
    )
}

export default ProfileDetails