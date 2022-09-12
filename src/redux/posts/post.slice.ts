import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { TPost, TReaction } from '../../types/post.type'
import { RootState } from '../store'

const initialState: TPost[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            coffee: 0,
            heart: 0,
            rocket: 0,
            thumbsUp: 0,
            wow: 0,
        },
    },
    {
        id: '2',
        title: 'Slices...',
        content: 'The more I say slice, the more I want pizza.',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            coffee: 0,
            heart: 0,
            rocket: 0,
            thumbsUp: 0,
            wow: 0,
        },
    },
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addNewPost: {
            reducer: (state, action: PayloadAction<TPost>) => {
                state.push(action.payload)
            },
            prepare: (title: string, content: string, userId: string) => ({
                payload: {
                    title,
                    content,
                    id: nanoid(),
                    userId,
                    date: new Date().toISOString(),
                    reactions: {
                        coffee: 0,
                        heart: 0,
                        rocket: 0,
                        thumbsUp: 0,
                        wow: 0,
                    },
                },
            }),
        },
        reactToPost: (
            state,
            action: PayloadAction<{ postId: string; reaction: keyof TReaction }>
        ) => {
            const { postId, reaction } = action.payload
            const postToReact = state.find(post => post.id === postId)

            if (postToReact) postToReact.reactions[reaction]++
        },
    },
})

export const { addNewPost, reactToPost } = postSlice.actions

export const selectAllPosts = (state: RootState) => state.posts

export default postSlice.reducer
