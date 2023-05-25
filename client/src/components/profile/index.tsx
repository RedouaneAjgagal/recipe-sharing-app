import { useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { ProfileData } from "../../pages/Profile";
import ProfileDetails from "./ProfileDetails";
import FavouriteRecipes from "./FavouriteRecipes";
import { URecipe } from "../recipes/Recipe";

const ProfileInfo = () => {
    const { profile, favouriteRecipes } = useRouteLoaderData("profileInfo") as { profile: ProfileData, favouriteRecipes: { recipe: URecipe }[] };

    return (
        <>
            <Suspense>
                <Await resolve={profile}>
                    {(loaderProfile) => <ProfileDetails profile={loaderProfile} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p className="text-center">Loading..</p>}>
                <Await resolve={favouriteRecipes}>
                    {(recipes) => <FavouriteRecipes recipes={recipes} favourited />}
                </Await>
            </Suspense>
        </>
    )
}

export default ProfileInfo

