interface Props {
    stats: {
        ingredients: string;
        methods: string;
        totalTime: string;
    }
}

const RecipeStats = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="flex justify-between items-center py-2">
            <div className="text-center text-slate-800 w-full">
                <span className="text-3xl">{props.stats.ingredients}</span>
                <p className="tracking-wide">Ingredients</p>
            </div>
            <div className="text-center text-slate-800 border-x-[1px] border-slate-800/30 w-full">
                <span className="text-3xl">{props.stats.methods}</span>
                <p className="tracking-wide">Methods</p>
            </div>
            <div className="text-center text-slate-800 w-full">
                <span className="text-3xl">{props.stats.totalTime}</span>
                <p className="tracking-wide">Minutes</p>
            </div>
        </div>
    )
}

export default RecipeStats