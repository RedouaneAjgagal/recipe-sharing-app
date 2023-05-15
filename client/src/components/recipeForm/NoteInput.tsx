import { useState } from 'react';
import Input from '../Input';
import { GrFormClose } from "react-icons/gr"


interface Props {
    value?: string
}

const NoteInput = (props: React.PropsWithoutRef<Props>) => {
    const [isNoteOpen, setIsNoteOpen] = useState(props.value ? true : false);

    const openNoteHandler = () => {
        setIsNoteOpen(prev => !prev);
    }

    return (
        <div className='flex items-center justify-between gap-2 pb-7'>
            {isNoteOpen &&
                <div className='flex gap-2 w-full'>
                    <Input name='note' placeHolder='Note' type='text' success={true} value={props.value} />
                </div>
            }
            <button className={` ${isNoteOpen ? "px-2 py-2": "px-4 py-2"} rounded-full bg-slate-200/80 text-slate-700/90 font-medium`} type="button" onClick={openNoteHandler}>{isNoteOpen ? <GrFormClose className="text-2xl " /> : "Add a note"}</button>
        </div>
    )
}

export default NoteInput