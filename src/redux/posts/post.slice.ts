import {
    createAsyncThunk,
    createSlice,
    nanoid,
    PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'
import { TPost, TReaction } from '../../types/post.type'
import { RootState } from '../store'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

interface IPostsState {
    posts: TPost[]
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    error: unknown | null
}

const initialState: IPostsState = {
    posts: [],
    status: 'idle', // idle | loading | failed | succeeded
    error: null,
}

export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
    async () => {
        const { data } = await axios.get(API_URL)
        return [...data] as {
            title: string
            id: number
            userId: number
            body: string
        }[]
    },
    {
        condition: (_, { getState }) => {
            const rootState = getState() as RootState

            // Only fetch posts if status is idle
            return rootState.posts.status === 'idle'
        },
    }
)

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (post: Pick<TPost, 'userId' | 'title' | 'content'>) => {
        const response = await axios.post(API_URL, {
            title: post.title,
            body: post.content,
            userId: post.userId,
        })
        return response.data as {
            id: number
            title: string
            body: string
            userId: string
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addNewPost: {
            reducer: (state, action: PayloadAction<TPost>) => {
                state.posts.push(action.payload)
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
            const postToReact = state.posts.find(post => post.id === postId)

            if (postToReact) postToReact.reactions[reaction]++
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllPosts.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.error = action.error.message
                state.status = 'failed'
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                let min = 1
                const loadedPosts = action.payload.map(post => ({
                    id: String(post.id),
                    title: post.title,
                    userId: String(post.userId),
                    date: sub(new Date(), {
                        minutes: min++,
                    }).toISOString(),
                    content: post.body,
                    reactions: {
                        coffee: 0,
                        heart: 0,
                        rocket: 0,
                        thumbsUp: 0,
                        wow: 0,
                    },
                })) as TPost[]
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push({
                    ...action.payload,
                    id: String(action.payload.id),
                    date: new Date().toISOString(),
                    reactions: {
                        coffee: 0,
                        heart: 0,
                        rocket: 0,
                        thumbsUp: 0,
                        wow: 0,
                    },
                    content: action.payload.body,
                })
            })
    },
})

export const { reactToPost } = postSlice.actions

export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

export default postSlice.reducer
