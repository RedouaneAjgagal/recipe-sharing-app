import { useEffect, useState } from "react"
import url from "../../config/url";
import { uploadImage } from "../../pages/NewPrecipe";
import { ImSpinner2 } from "react-icons/im";

interface Props {
    profilePicture: string
    alt: string
    getUploadingState: (isUploading: boolean) => void
}

const UserImage = (props: React.PropsWithoutRef<Props>) => {
    const [isError, setIsError] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        props.getUploadingState(isLoading);
    }, [isLoading]);

    const uploadimageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsError(false);
        const image = e.currentTarget.files?.item(0);
        const maxSize = 1024 * 1024;
        if (!image || image.size > maxSize || !image.type.startsWith("image")) {
            setIsError(true);
            return;
        }

        const uploadImageFun = async () => {
            setIsLoading(true);
            const customUrl = `${url}/user`;
            const imageData = await uploadImage([image], customUrl, "picture");
            if (imageData.msg) {
                setIsError(true);
                setIsLoading(false);
                return
            }
            const imageUrl = imageData.src!.toString();
            setImgUrl(imageUrl);
            setIsLoading(false);
        }
        uploadImageFun();
    }

    return (
        <div className="flex items-center gap-2 relative mb-2">
            <label htmlFor="uploadImg">
                <div className="flex relative w-24 h-24">
                    <img className="w-full h-full object-cover rounded-full border-2 border-dashed border-slate-900/25" src={imgUrl ? imgUrl : props.profilePicture} alt={props.alt} />
                    {isLoading ? <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-slate-700/80 rounded-full">
                        <ImSpinner2 className="animate-spin text-amber-600 text-4xl" />
                    </div> : null}
                </div>
                <input type="file" name="uploadImg" id="uploadImg" className="sr-only" accept="image/*" onChange={uploadimageHandler} disabled={isLoading} />
                <input type="text" hidden className="sr-only" name="image" value={imgUrl} readOnly />
                {isError && <p className="text-sm absolute -bottom-5 text-red-600">Please provide a valid image</p>}
            </label>
            <div>
                <h3 className="text-lg text-black font-medium">Avatar</h3>
                <p className="text-sm text-gray-500/80">Image cannot be more than 1MB</p>
            </div>
        </div>
    )
}

export default UserImage