import { ImSpinner2 } from 'react-icons/im'

const Loading = () => {
    return (
        <div className="flex justify-center w-full mt-10">
            <ImSpinner2 className="animate-spin text-3xl" />
        </div>
    )
}

export default Loading