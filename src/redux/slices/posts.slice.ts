import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const createNewPost = createAsyncThunk(
    'posts/createNewPost',
    async (post: Omit<TPost, 'id'>) => {
        const response = await axios.post(BASE_URL, post)
        return response.data
    }
)

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        addNewReaction: (
            state,
            action: PayloadAction<{
                reaction: 'wow' | 'rocket' | 'thumbsUp' | 'coffee' | 'heart'
                postId: number
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
            .addCase(
                createNewPost.fulfilled,
                (state, action: PayloadAction<TPost>) => {
                    action.payload.userId = +action.payload.userId
                    console.log(action.payload)
                    state.posts.unshift(action.payload)
                }
            )
    },
})

export const selectAllPosts = (state: TRootState) => state.posts.posts
export const selectPostsStatus = (state: TRootState) => state.posts.status
export const selectPostsError = (state: TRootState) => state.posts.error

export const selectPostById = (state: TRootState, postId: number) =>
    state.posts.posts.find(({ id }) => id === postId)

export const { addNewReaction } = postsSlice.actions
export default postsSlice.reducer
