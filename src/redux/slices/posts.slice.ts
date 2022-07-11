import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TPost } from '../../types/post.type'
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
    reducers: {
        addNewPost: {
            reducer: (state, action: PayloadAction<TPost>) => {
                state.unshift(action.payload)
            },
            prepare: (title: string, body: string) => ({
                payload: {
                    title,
                    body,
                    id: nanoid(),
                },
            }),
        },
    },
})

export const selectAllPosts = (state: TRootState) => state.posts

export const { addNewPost } = postsSlice.actions
export default postsSlice.reducer
