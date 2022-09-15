import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TUser } from '../../types/user.type'
import { RootState } from '../store'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

interface IUsersState {
    users: TUser[]
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    error: unknown | null
}

const initialState: IUsersState = {
    users: [],
    error: null,
    status: 'idle',
}

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
        const { data } = await axios.get(API_URL)
        return [...data] as any[]
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllUsers.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'

                const loadedUsers = action.payload.map(user => ({
                    id: String(user.id),
                    name: user.name,
                })) as TUser[]

                state.users = state.users.concat(loadedUsers)
            })
    },
})

export const selectAllUsers = (state: RootState) => state.users.users

export default userSlice.reducer
