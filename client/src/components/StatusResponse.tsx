

interface Props {
    success: boolean,
    message: string
}

const StatusResponse = (props: React.PropsWithoutRef<Props>) => {
    return (
        <section className={`text-white py-2 absolute top-0 left-0 w-full ${props.success ? "bg-green-600" : "bg-red-600"}`}>
            <p className="text-center">{props.message}</p>
        </section>
    )
}

export default StatusResponse