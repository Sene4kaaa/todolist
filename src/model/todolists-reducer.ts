import {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state
    }
}

type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

type Actions = DeleteTodolistAction