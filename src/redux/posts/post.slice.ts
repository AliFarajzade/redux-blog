import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'
import { TPost, TReaction } from '../../types/post.type'
import { RootState } from '../store'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

interface IPostsState {
    status: 'idle' | 'loading' | 'failed' | 'succeeded'
    error: unknown | null
    count: number
}

const postsAdapter = createEntityAdapter<TPost>({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState<IPostsState>({
    status: 'idle', // idle | loading | failed | succeeded
    error: null,
    count: 0,
})

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

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (post: TPost) => {
        const response = await axios.patch(`${API_URL}/${post.id}`, post)
        return response.data as TPost
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: string) => {
        await axios.delete(`${API_URL}/${postId}`)
        return postId
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactToPost: (
            state,
            action: PayloadAction<{ postId: string; reaction: keyof TReaction }>
        ) => {
            const { postId, reaction } = action.payload
            const postToReact = state.entities[postId]

            if (postToReact) postToReact.reactions[reaction]++
        },
        increaseCount: state => {
            state.count++
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
                postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                postsAdapter.addOne(state, {
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
            .addCase(updatePost.fulfilled, (state, action) => {
                action.payload.date = new Date().toISOString()

                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const id = action.payload

                postsAdapter.removeOne(state, id)
            })
    },
})

export const { reactToPost, increaseCount } = postSlice.actions

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

export const selectUsersPosts = createSelector(
    [selectAllPosts, (_state: RootState, userId: string) => userId],
    (posts: TPost[], userId: string) =>
        posts.filter(post => post.userId === userId)
)

export const selectCount = (state: RootState) => state.posts.count

export default postSlice.reducer
