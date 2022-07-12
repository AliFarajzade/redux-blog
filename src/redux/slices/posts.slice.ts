import {
    createAsyncThunk,
    createSlice,
    nanoid,
    PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { TPost } from '../../types/post.types'
import { TRequestStatus } from '../../types/request.types'
import { TRootState } from '../store'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [] as TPost[],
    status: 'idle' as TRequestStatus,
    error: null as null | any,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(BASE_URL)
    return response.data
})

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        addNewPost: {
            reducer: (state, action: PayloadAction<TPost>) => {
                state.posts.unshift(action.payload)
            },
            prepare: (title: string, body: string, authorId: string) => ({
                payload: {
                    title,
                    body,
                    id: nanoid(),
                    userId: authorId,
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
            const postToReact = state.posts.find(post => post.id === postId)!
            postToReact.reactions[reaction]++
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.status = 'loading'
            })
            .addCase(
                fetchPosts.fulfilled,
                (
                    state,
                    action: PayloadAction<
                        Pick<TPost, 'body' | 'id' | 'title' | 'userId'>[]
                    >
                ) => {
                    state.status = 'succeeded'
                    const loadedPosts = action.payload.map(post => ({
                        ...post,
                        createdAt: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            rocket: 0,
                            heart: 0,
                            coffee: 0,
                        },
                    }))

                    console.log(loadedPosts)
                    state.posts = state.posts.concat(loadedPosts)
                }
            )
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const selectAllPosts = (state: TRootState) => state.posts.posts
export const selectPostsStatus = (state: TRootState) => state.posts.status
export const selectPostsError = (state: TRootState) => state.posts.error

export const { addNewPost, addNewReaction } = postsSlice.actions
export default postsSlice.reducer
