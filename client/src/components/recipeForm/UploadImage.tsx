import { ImSpinner2 } from "react-icons/im";
import RecipeImage from "./RecipeImage"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import uploadImages from "../../features/uploadImages";
import url from "../../config/url";


interface Props {
    recipeImages: string[];
    isImageLoading: (isLoading: boolean) => void;
    isLoading: boolean
}

const UploadImage = (props: React.PropsWithoutRef<Props>) => {
    const [recipesImgs, setRecipeImgs] = useState<string[]>(props.recipeImages || []);

    const removeImgHandler = (value: string) => {
        setRecipeImgs(images => {
            const updatedImages = images?.filter(img => img !== value);
            return updatedImages
        })
    }

    const addImagesHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = e.currentTarget.files;
        const isLimited = e.currentTarget.files!.length + recipesImgs!.length > 3;
        if (!images || images.length < 1) {
            return;
        }
        if (isLimited) {
            return;
        }
        for (let i = 0; i < images.length; i++) {
            const image = images.item(i)!;
            const maxSize = 1024 * 1024;
            if (image.size > maxSize || !image.type.startsWith("image")) {
                return;
            }
            props.isImageLoading(true);
            const { src } = await uploadImages([image], `${url}/recipes/upload-images`, "images");
            if (src) {
                setRecipeImgs(imgs => {
                    return imgs?.concat(src[0]);
                });
            }
            props.isImageLoading(false);
            e.target.value = "";
        }
    }


    return (
        <div className='flex gap-4'>
            {recipesImgs.map(img => <RecipeImage key={crypto.randomUUID()} src={img} onRemove={removeImgHandler} length={recipesImgs.length} />)}
            <input type="text" hidden value={recipesImgs} name='images' readOnly />
            <div className='flex justify-center items-center'>
                <label htmlFor="addImages" className='cursor-pointer'>
                    {recipesImgs.length < 3 && (props.isLoading ? <ImSpinner2 className="text-2xl animate-spin" /> : <AiOutlinePlus className="text-2xl" />)}
                    <input type="file" className='sr-only' id='addImages' onChange={addImagesHandler} accept='image/*' multiple disabled={props.isLoading} />
                </label>
            </div>
        </div>
    )
}

export default UploadImage