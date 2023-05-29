import { createPortal } from "react-dom"

interface Props {
    success: boolean,
    message: string
}

const StatusResponse = (props: React.PropsWithoutRef<Props>) => {
    return (
        createPortal(
            <section className={`text-white p-2 fixed top-0 left-0 z-50 w-full rounded shadow-md ${props.success ? "bg-green-500" : "bg-red-600"}`}>
                <p className="text-center font-medium tracking-wide">{props.message}</p>
            </section>,
            document.getElementById("status")!
        )
    )
}

export default StatusResponse