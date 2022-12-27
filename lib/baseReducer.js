import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        'todos': []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.todos = action.payload
        },
        clearTodo: (state, action)=>{
            state.todos = []
        }
    }
})

export default todoSlice.reducer

export const {addTodo} = todoSlice.actions