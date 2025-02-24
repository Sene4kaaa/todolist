import {Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "change_todolist_title": {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist', payload: {
            id: v1(),
            title: title
        }
    } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'change_todolist_title',
        payload
    } as const
}

type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction