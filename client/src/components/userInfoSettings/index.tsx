import UserImage from "./UserImage"
import { ProfileData } from "../../pages/Profile";
import InputContainer from "./InputContainer";
import MealsList from "./MealsList";
import PrimaryBtn from "../../UI/PrimaryBtn";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

interface Props {
  profileInfo: ProfileData;
}

const ProfileSettings = (props: React.PropsWithoutRef<Props>) => {
  const fetcher = useFetcher();
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const [favouriteMeals, setFavouriteMeals] = useState(props.profileInfo.favouriteMeals);


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
          <UserImage profilePicture={props.profileInfo.picture} alt={`${props.profileInfo.user.name}'s profile picture`} getUploadingState={isUploadingImgHandler} />
          <InputContainer label="Name" value={props.profileInfo.user.name} type="text" />
          <InputContainer label="Email" value={props.profileInfo.user.email} type="email" readOnly />
          <InputContainer label="Bio" value={props.profileInfo.bio} type="texterea" />
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