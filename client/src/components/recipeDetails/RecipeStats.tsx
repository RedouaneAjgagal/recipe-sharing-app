interface Props {
    stats: {
        ingredients: string;
        methods: string;
        totalTime: string;
    }
}

const RecipeStats = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="flex justify-between items-center py-2 text-center sm:text-left">
            <div className="text-slate-800 w-full">
                <span className="text-3xl">{props.stats.ingredients}</span>
                <p className="tracking-wide">Ingredients</p>
            </div>
            <div className="text-slate-800 border-x border-slate-800/30 w-full sm:border-none">
                <span className="text-3xl">{props.stats.methods}</span>
                <p className="tracking-wide">Methods</p>
            </div>
            <div className="text-slate-800 w-full">
                <span className="text-3xl">{props.stats.totalTime}</span>
                <p className="tracking-wide">Minutes</p>
            </div>
        </div>
    )
}

export default RecipeStats