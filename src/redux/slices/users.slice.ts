import { createSlice } from '@reduxjs/toolkit'
import { TUser } from '../../types/user.types'
import { TRootState } from '../store'

const initialState: TUser[] = [
    {
        id: '1',
        name: 'John Doe',
    },
    {
        id: '2',
        name: 'Rebbecca Bennett',
    },
    {
        id: '3',
        name: 'Jane Williams',
    },
]

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},
})

export const selectAllUsers = (state: TRootState) => state.users

export default usersSlice.reducer
