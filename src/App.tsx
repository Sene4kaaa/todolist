import './App.css'
import {TodolistItem} from './TodolistItem'
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

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

export type TasksState = {
    [key: string]: Task[]
}

export type Filter = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

export const App = () => {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgba(38,15,225,0.99)',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, setTasks] = useState<TasksState>({})

    const changeFilter = (todolistId: string, filter: Filter) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTasks({...tasks, [action.payload.id]: []})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodolistItem key={todolist.id}
                                                      todolist={todolist}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      changeTaskTitle={changeTaskTitle}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTodolistTitle={changeTodolistTitle}/>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}
