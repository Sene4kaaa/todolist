import type {Filter, Task} from './App'
import {Button} from './Button'
import {KeyboardEvent, ChangeEvent, useState} from "react";

type TodolistItem = {
    id: string
    title: string
    tasks: Task[]
    deleteTask: (id: string) => void
    changeFilter: (todolistId: string, filter: Filter) => void
    createTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: Filter
}

export const TodolistItem = ({
                                 id,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter
                             }: TodolistItem) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />

                <Button
                    title={'+'}
                    onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {

                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilter("all", id)}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilter("active", id)}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilter("completed", id)}/>

            </div>
        </div>
    )
}
