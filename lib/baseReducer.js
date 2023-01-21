import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        'todos': [],
        'user': []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.todos = [...state.todos, action.payload]
        },
        clearTodo: (state, action)=>{
            state.todos = []
        },
        addUser: (state,action)=>{
            state.user = action.payload
        },
        clearUser: (state,action)=>{
            state.user = []
        }
    },
    // extraReducers: {
    //     [HYDRATE]: (state,action)=>{
    //         return state = {
    //             ...state,
    //             ...action.payload.todos
    //         }
    //     }
    // }
})

export default todoSlice.reducer

export const {addTodo, clearTodo, changeActive, addUser, clearUser} = todoSlice.actions

export const fetchUser = (name, email) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/getUser',{
            name: name,
            email: email
        }).
        then(resp=>dispatch(addUser(resp.data.rows)))
    } catch (error) {
        return console.log(error.message)
    }
}

