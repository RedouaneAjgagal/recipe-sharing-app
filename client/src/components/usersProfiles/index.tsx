import { useLoaderData } from "react-router-dom";
import { UUserProfile } from "../../pages/UsersProfile";
import ProfileDetails from "../profile/ProfileDetails";
import FavouriteRecipes from "../profile/FavouriteRecipes";

const UserProfile = () => {
    const { profile, recipes } = useLoaderData() as UUserProfile;

    return (
        <div>
            <ProfileDetails profile={profile} readonly />
            <FavouriteRecipes recipes={recipes} />
        </div>
    )
}

export default UserProfile