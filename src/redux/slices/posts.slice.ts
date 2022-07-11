import { createSlice } from '@reduxjs/toolkit'
import { TRootState } from '../store'

const initialState = [
    {
        id: '1',
        title: 'Learining React',
        body: 'React is a JavaScript library for building user interfaces.',
    },
    {
        id: '2',
        title: 'Learining Redux',
        body: 'Redux is a predictable state container for JavaScript apps.',
    },
]

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {},
})

export const selectAllPosts = (state: TRootState) => state.posts

export default postsSlice.reducer
