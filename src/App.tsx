import './App.css'
import {TodolistItem} from './TodolistItem'
import {useState} from "react";
import {v1} from "uuid";

export type Todolist = {
    id: string
    title: string
    filter: Filter
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type Filter = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<Array<Task>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const changeFilter = (todolistId: string, filter: Filter) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
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

            {todolists.map(todolist => {

                let filteredTasks = tasks
                if (todolist.filter === 'active') {
                    filteredTasks = tasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}

                    />
                )
            })}
        </div>
    )
}
