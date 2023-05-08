
interface Props {
    success: boolean,
    message: string
}

const StatusResponse = (props: React.PropsWithoutRef<Props>) => {
    return (
        <section className={`text-white p-2 absolute top-0 left-0 w-full rounded shadow-md ${props.success ? "bg-green-500" : "bg-red-600"}`}>
            <p className="text-center font-medium tracking-wide">{props.message}</p>
        </section>
    )
}

export default StatusResponse