import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        'todos': []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.todos = [...state.todos, action.payload]
        },
        clearTodo: (state, action)=>{
            state.todos = []
        },
        changeActive: (state, action)=>{
            let arr = [...state.todos]
            arr = arr.map(el=>{
                if (el.id == action.payload.id) {
                    el.isActive = !action.payload.isActive
                }
                return el
            })
            state.todos = arr
        }
    },
    extraReducers: {
        [HYDRATE]: (state,action)=>{
            return state = {
                ...state,
                ...action.payload.todos
            }
        }
    }
})

export default todoSlice.reducer

export const {addTodo, clearTodo, changeActive} = todoSlice.actions