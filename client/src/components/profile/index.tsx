import { ProfileData } from "../../pages/Profile";
import ProfileDetails from "./ProfileDetails";
import FavouriteRecipes from "./FavouriteRecipes";
import { URecipe } from "../recipes/Recipe";
import { useQuery } from "@tanstack/react-query";
import getProfileInfo from "../../fetchers/getProfileInfo";
import Loading from "../../UI/Loading";

interface Props {
    profileInfo: ProfileData;
}

const ProfileInfo = (props: React.PropsWithoutRef<Props>) => {

    const favouriteRecipesQuery = useQuery({
        queryKey: ["favouriteRecipes"],
        queryFn: () => getProfileInfo("favourite")
    });

    return (
        <>
            <ProfileDetails profile={props.profileInfo} />
            {favouriteRecipesQuery.isLoading ?
                <Loading />
                :
                <FavouriteRecipes recipes={favouriteRecipesQuery.data as { recipe: URecipe }[]} favourited />}

        </>
    )
}

export default ProfileInfo

