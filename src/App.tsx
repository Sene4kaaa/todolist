import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type Filter = 'All' | 'Active' | 'Completed'

export const App = () => {
    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<Filter>('All')

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    const changeFilter = (newFilter: Filter) => {
        setFilter(newFilter)
    }

    const deleteTask = (taskId: string) => {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }

    const createTask = (taskTitle: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(newState)
    }


    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}
