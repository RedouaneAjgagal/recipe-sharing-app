interface Props {
    onClick: () => void
}

const Overlay = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div onClick={props.onClick} role="button" className="bg-gray-900/80 fixed left-0 top-0 w-full h-full z-10"></div>
    )
}

export default Overlay