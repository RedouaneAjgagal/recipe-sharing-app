import UserImage from "./UserImage"
import { ProfileData } from "../../pages/Profile";
import InputContainer from "./InputContainer";
import MealsList from "./MealsList";
import PrimaryBtn from "../../UI/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "../../features/updateProfile";
import { ImSpinner2 } from "react-icons/im";

interface Props {
  profileInfo: ProfileData;
}

const ProfileSettings = (props: React.PropsWithoutRef<Props>) => {
  const queryClient = useQueryClient();
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const navigate = useNavigate();

  const [favouriteMeals, setFavouriteMeals] = useState(props.profileInfo.favouriteMeals);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (errors) => {
      if (errors) return;
      queryClient.invalidateQueries(["profile"]);
      navigate("..");
    }
  })

  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploadingImg) return;
    const formData = new FormData(e.currentTarget);
    formData.append("favouriteMeals", favouriteMeals.toString());
    mutation.mutate(formData);
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
    <form className="flex flex-col gap-4 pb-4 mt-6" onSubmit={updateProfileHandler}>
      <div className="bg-white p-4 border-b flex flex-col gap-5 rounded">
        <h1 className="font-medium tracking-wider text-xl">PERSONAL</h1>
        <div className="flex flex-col gap-4">
          <UserImage profilePicture={props.profileInfo.picture} alt={`${props.profileInfo.user.name}'s profile picture`} getUploadingState={isUploadingImgHandler} />
          <InputContainer label="Name" value={props.profileInfo.user.name} type="text" isError={mutation.data?.name} />
          <InputContainer label="Email" value={props.profileInfo.user.email} type="email" readOnly />
          <InputContainer label="Bio" value={props.profileInfo.bio} type="texterea" isError={mutation.data?.bio} />
          <MealsList meals={favouriteMeals} onRemove={removeFavouriteMeal} isError={mutation.data?.favouriteMeals} />
        </div>
        <div className="w-full sm:w-48">
          <PrimaryBtn disabled={mutation.isLoading || isUploadingImg} style="orange">{mutation.isLoading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Update Profile"}</PrimaryBtn>
        </div>
      </div>
    </form>
  )
}

export default ProfileSettings