import { useRouteLoaderData } from "react-router-dom"
import UserImage from "./UserImage"
import { ProfileData } from "../../pages/Profile";
import InputContainer from "./InputContainer";
import MealsList from "./MealsList";
import PrimaryBtn from "../../UI/PrimaryBtn";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

const ProfileSettings = () => {
  const { profile } = useRouteLoaderData("profileInfo") as { profile: ProfileData };
  const fetcher = useFetcher();
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const [favouriteMeals, setFavouriteMeals] = useState(profile.favouriteMeals);


  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploadingImg) return;
    const formData = new FormData(e.currentTarget);
    formData.append("favouriteMeals", favouriteMeals.toString());
    fetcher.submit(formData, { method: "PATCH" });
  }

  const isUploadingImgHandler = (isUploading: boolean) => {
    setIsUploadingImg(isUploading);
  }

  const removeFavouriteMeal = (removedIndex: number) => {
    setFavouriteMeals(meals => {
      const updatedMeals = meals.filter((_, index) => index !== removedIndex);
      return updatedMeals;
    });
  }

  return (
    <fetcher.Form className="flex flex-col gap-4 pb-4" onSubmit={updateProfileHandler}>
      <div className="bg-white p-4 border-b">
        <h1 className="font-medium tracking-wider text-xl mb-3">PERSONAL</h1>
        <div className="flex flex-col gap-4">
          <UserImage profilePicture={profile.picture} alt={`${profile.user.name}'s profile picture`} getUploadingState={isUploadingImgHandler} />
          <InputContainer label="Name" value={profile.user.name} type="text" />
          <InputContainer label="Email" value={profile.user.email} type="email" readOnly />
          <InputContainer label="Bio" value={profile.bio} type="texterea" />
          <MealsList meals={favouriteMeals} submit={fetcher.state} onRemove={removeFavouriteMeal} />
        </div>
      </div>
      <div className="px-4">
        <PrimaryBtn disabled={fetcher.state !== "idle" || isUploadingImg} style="orange">Update Profile</PrimaryBtn>
      </div>
    </fetcher.Form>
  )
}

export default ProfileSettings