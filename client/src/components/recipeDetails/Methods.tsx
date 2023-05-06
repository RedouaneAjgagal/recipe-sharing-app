import { UMethods } from "../../pages/Recipe"
import Method from "./Method"
interface Props {
    methods: UMethods[]
}

const Methods = (props: React.PropsWithoutRef<Props>) => {

    const methods = props.methods.map((method, index) => <Method method={method} key={index} />)


    return (
        <section className="mt-6">
            <h2 className="text-2xl text-slate-700 font-medium tracking-wide pb-4 border-b border-slate-800/30">Methods</h2>
            <ul className="list-decimal list-inside leading-loose">
                {methods}
            </ul>
        </section>
    )
}

export default Methods