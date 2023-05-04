import NextPage from "./NextPage"
import PreviousPage from "./PreviousPage"


interface Props {
    numOfPages: number
}

const ChangePages = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="bg-white rounded shadow-lg shadow-slate-300/25 flex items-center justify-between -mt-5 text-slate-700">
            <PreviousPage />
            <NextPage numOfPages={props.numOfPages} />
        </div>
    )
}

export default ChangePages