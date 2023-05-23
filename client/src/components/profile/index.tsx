import { useRouteLoaderData } from "react-router-dom"
import { ProfileData } from "../../pages/Profile";
import ProfilePicture from "./ProfilePicture";

const ProfileInfo = () => {
    const profile = useRouteLoaderData("profileInfo") as ProfileData;

    return (
        <section className="bg-white p-4 rounded border text-center flex flex-col gap-4">
            <ProfilePicture picture={profile.picture} name={profile.user.name} />
            <h1 className="text-xl font-medium tracking-wide">{profile.user.name}</h1>
            <p className="text-slate-500">{profile.bio}</p>
            <div className="flex flex-col gap-2">
                <h2 className="font-medium">Favourite Meals</h2>
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {profile.favouriteMeals.map((meal, index) => <span key={index} className="bg-amber-600 text-white font-medium tracking-wide rounded py-[0.15rem] px-2">{meal}</span>)}
                </div>
            </div>
        </section>
    )
}

export default ProfileInfo