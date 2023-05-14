interface Props {
    errorMsg?: string
}

const UploadImage = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className='mb-4 flex flex-col justify-center relative pb-5'>
            <h2 className='text-2xl font-medium text-slate-700/90 mt-7 mb-5'>Image</h2>
            <label htmlFor="images" className="font-medium text-slate-600">Choose an image for your recipe:</label>
            <input type="file" name="images" id="images" accept="image/*" className='py-2' multiple />
            {props.errorMsg && <span className="absolute bottom-0 left-0 text-sm text-red-700">{props.errorMsg}</span>}
        </div>
    )
}

export default UploadImage