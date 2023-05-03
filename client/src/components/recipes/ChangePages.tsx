import NextPage from "./NextPage"
import PreviousPage from "./PreviousPage"

const ChangePages = () => {
  return (
    <div className="bg-white rounded shadow-lg shadow-slate-300/25 flex items-center justify-between -mt-5 text-slate-700">
        <PreviousPage />
        <NextPage />
    </div>
  )
}

export default ChangePages