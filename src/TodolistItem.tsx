import type {Filter, TaskPropsType} from './App'
import {Button} from './Button'
import {KeyboardEvent, ChangeEvent, useState} from "react";

type TodolistItemPropsType = {
    title: string
    tasks: TaskPropsType[]
    deleteTask: (id: string) => void
    changeFilter: (value: Filter) => void
    createTask: (taskTitle: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistItemPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            createTaskHandler()
        }
    }

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />

                <Button
                    title={'+'}
                    onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {

                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'X'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter("All")}/>
                <Button title={'Active'} onClick={() => changeFilter("Active")}/>
                <Button title={'Completed'} onClick={() => changeFilter("Completed")}/>

            </div>
        </div>
    )
}
