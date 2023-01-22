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
        addUser: (state, action)=>{
            state.user = action.payload
        },
        changeAct: (state, action)=>{
            let index = state.todos.findIndex(el=>el.todo_id == action.payload[0])
            state.todos[index].isactive = !action.payload[1]
        },
        clearTodo: (state, action)=>{
            state.todos = []
        },
        removeTodo: (state, action)=>{
            let arr = state.todos.filter(el=>{return el.todo_id != action.payload})
            state.todos = arr
        },
        fetchTodo: (state, action)=>{
            state.todos = action.payload
        },
        subscribeUser: (state, action)=>{
            let index = state.user.findIndex(el=>{return el.email == action.payload[1]})
            state.user[index].duration = action.payload[0]
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

export const {addTodo, addUser, changeAct, clearTodo, removeTodo, fetchTodo, subscribeUser} = todoSlice.actions

export const fetchUser = (name, email) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/getUser',{
            name: name,
            email: email
        }).
        then(resp=>{
            console.log(resp,'resp')
            dispatch(addUser(resp.data.user.rows))
            if (resp.data.todo.rows.length > 0) {
                dispatch(fetchTodo(resp.data.todo.rows))
            }
        })
    } catch (error) {
        return console.log(error.message)
    }
}

export const addNewTodo = (object) => async dispatch => {
    try {
        object && await axios.post(process.env.NEXT_PUBLIC_URL + '/api/addTodo',{
            email: object.email,
            content: object.content,
            isactive: object.isactive
        }).
        then(resp=>{
            if (resp.data.message == 'ok') {
                console.log(resp,'action');
                object.todo_id = resp.data.todo_id.rows[0].todo_id 
                dispatch(addTodo(object))
            } else {
                console.log('somethings wrong')
            }
        })
    } catch (error) {
        return console.log(error.message)
    }
}

export const changeActive = (todo_id, isactive) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/changeActive',{
            todo_id: todo_id,
            isactive: isactive
        }).then(resp=>{
            if (resp.data.message == 'ok') {
                dispatch(changeAct([todo_id, isactive]))
            }
        })
    } catch (error) {
        return console.log(error.message)
    }
}

export const clearToDos = (email) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/clearTodo',{
            email: email
        }).
        then(resp=>{
            if (resp.data.message == 'ok') {
                dispatch(clearTodo())
            }
        })
    } catch (error) {
        return console.log(error.message)
    }
}

export const deleteTodo = (id) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_URL + '/api/deleteTodo',{
            id: id
        }).
        then(resp=>{
            if (resp.data.message == 'ok') {
                dispatch(removeTodo(id))
            }
        })
    } catch (error) {
        return console.log(error.message)
    }
}

