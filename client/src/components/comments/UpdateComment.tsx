import { MdModeEditOutline } from "react-icons/md"

interface Props {
    onClick: () => void
}

const UpdateComment = (props: React.PropsWithoutRef<Props>) => {

    const openUpdateHandler = () => {
        props.onClick();
    }

    return (
        <button onClick={openUpdateHandler} className="flex items-center gap-1 font-medium text-blue-600">
            <MdModeEditOutline className="text-lg" />
            Edit
        </button>
    )
}

export default UpdateComment