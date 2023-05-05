import { UMethods } from "../../pages/Recipe"


interface Props {
    method: UMethods
}

const Method = (props: React.PropsWithoutRef<Props>) => {
    return (
        <li className="text-xl text-slate-700 font-medium mt-8">
            <span className="inline-block tracking-wide">{props.method.title}:</span>
            <p className="text-[#535353] text-base font-normal pt-4 pb-6 leading-relaxed">{props.method.sub}</p>
        </li>
    )
}

export default Method