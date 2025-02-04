import {ChangeEvent, useState} from "react";

type EditableSpan = {
    value: string
    onChange: (title: string) => void
}
export const EditableSpan = ({value,onChange}: EditableSpan) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(title)
    }

    return <>
        {isEditMode
            ?
            <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus/>
            :
            <span onDoubleClick={turnOnEditMode}>{value}</span>}
    </>
}