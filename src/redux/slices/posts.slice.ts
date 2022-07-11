import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TPost } from '../../types/post.types'
import { TRootState } from '../store'

const initialState: TPost[] = [
    {
        id: '1',
        title: 'Learining React',
        body: 'React is a JavaScript library for building user interfaces.',
        authorId: '1',
        createdAt: '2022-07-10T08:01:47.876Z',
        reactions: {
            thumbsUp: 0,
            wow: 0,
            rocket: 0,
            heart: 0,
            coffee: 0,
        },
    },
    {
        id: '2',
        title: 'Learining Redux',
        body: 'Redux is a predictable state container for JavaScript apps.',
        authorId: '2',
        createdAt: '2022-07-11T07:25:47.876Z',
        reactions: {
            thumbsUp: 0,
            wow: 0,
            rocket: 0,
            heart: 0,
            coffee: 0,
        },
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
                    createdAt: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        rocket: 0,
                        heart: 0,
                        coffee: 0,
                    },
                },
            }),
        },
        addNewReaction: (
            state,
            action: PayloadAction<{
                reaction: 'wow' | 'rocket' | 'thumbsUp' | 'coffee' | 'heart'
                postId: string
            }>
        ) => {
            const { postId, reaction } = action.payload
            const postToReact = state.find(post => post.id === postId)!
            postToReact.reactions[reaction]++
        },
    },
})

export const selectAllPosts = (state: TRootState) => state.posts

export const { addNewPost, addNewReaction } = postsSlice.actions
export default postsSlice.reducer
