import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"


const registerUser = createAsyncThunk("registerUser",async()=>{
    const response = await axios.post("http://localhost:8080/users/register")
    return response.data
})

const loginUser = createAsyncThunk("loginUser",async()=>{
    const response = await axios.post("http://localhost:8080/users/login")
    return response.data
})

const logoutUser = createAsyncThunk("logoutUser",async()=>{
    const response = await axios.get("http://localhost:8080/users/logout")
    return response.data
})

const initialState = {
    user:null,
    isloading:false,
    iserror:null
}

const userSlice = createSlice({
    name:"USER",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            state.isloading = true

        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.isloading = false
            state.user = action.payload
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.isloading = false
            state.iserror = action.error
        })
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isloading = true
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isloading = false
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isloading = false
            state.iserror = action.error
        })
        builder.addCase(logoutUser.pending,(state,action)=>{
            state.isloading = true
        })
        builder.addCase(logoutUser.fulfilled,(state,action)=>{
            state.isloading = false
            state.user = action.payload
        })
        builder.addCase(logoutUser.rejected,(state,action)=>{
            state.isloading = false
            state.iserror = action.error
        })

    }
})

export {registerUser,loginUser,logoutUser}

export default userSlice.reducer