import { createSlice } from '@reduxjs/toolkit'
import { TUser } from '../../types/user.type'
import { RootState } from '../store'

const initialState: TUser[] = [
    {
        id: '1',
        name: 'John Doe',
    },
    {
        id: '2',
        name: 'Sarah Williams',
    },
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users

export default userSlice.reducer
