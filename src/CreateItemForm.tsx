import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemForm = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: CreateItemForm) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const createTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <input
            className={error ? 'error' : ''}
            value={title}
            onChange={changeTaskTitleHandler}
            onKeyDown={createTaskOnEnterHandler}
        />

        <Button
            title={'+'}
            onClick={createTaskHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}