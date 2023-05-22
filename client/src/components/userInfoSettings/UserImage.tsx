
interface Props {
    profilePicture: string
    alt: string
}

const UserImage = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="uploadImg">
                <img className="w-full max-w-[6rem] rounded-full" src={props.profilePicture} alt={props.alt} />
                <input type="file" id="uploadImg" className="sr-only" accept="image/*" />
            </label>
            <div>
                <h3 className="text-lg text-black font-medium">Avatar</h3>
                <p className="text-sm text-gray-500/80">Image cannot be more than 1MB</p>
            </div>
        </div>
    )
}

export default UserImage