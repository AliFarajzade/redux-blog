import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TPost } from '../../types/post.types'
import { TRootState } from '../store'

const initialState: TPost[] = [
    {
        id: '1',
        title: 'Learining React',
        body: 'React is a JavaScript library for building user interfaces.',
        authorId: '1',
    },
    {
        id: '2',
        title: 'Learining Redux',
        body: 'Redux is a predictable state container for JavaScript apps.',
        authorId: '2',
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
            prepare: (title: string, body: string, authorId: string) => ({
                payload: {
                    title,
                    body,
                    id: nanoid(),
                    authorId,
                },
            }),
        },
    },
})

export const selectAllPosts = (state: TRootState) => state.posts

export const { addNewPost } = postsSlice.actions
export default postsSlice.reducer
