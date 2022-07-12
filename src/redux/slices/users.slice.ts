import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TUser } from '../../types/user.types'
import { TRootState } from '../store'

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState: TUser[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(BASE_URL)
    return response.data
})

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (_state, action) => {
            return action.payload
        })
    },
})

export const selectAllUsers = (state: TRootState) => state.users

export default usersSlice.reducer
