import { UUserProfile } from "../../pages/UsersProfile";
import ProfileDetails from "../profile/ProfileDetails";
import FavouriteRecipes from "../profile/FavouriteRecipes";

interface Props {
    userInfo: UUserProfile;
}

const UserProfile = (props: React.PropsWithoutRef<Props>) => {

    return (
        <div>
            <ProfileDetails profile={props.userInfo.profile} readonly />
            <FavouriteRecipes recipes={props.userInfo.recipes} />
        </div>
    )
}

export default UserProfile