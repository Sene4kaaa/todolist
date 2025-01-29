import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: Filter
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type Filter = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<Filter>('all')

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
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
                          filter={filter}
            />
        </div>
    )
}
