import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { TPost } from '../../types/post.types'
import { TRequestStatus } from '../../types/request.types'
import { TRootState } from '../store'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter<TPost>({
    sortComparer: (a: TPost, b: TPost) =>
        b.createdAt.localeCompare(a.createdAt),
})

const initialState = postsAdapter.getInitialState({
    status: 'idle' as TRequestStatus,
    error: null as null | any,
})

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

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (post: Omit<TPost, 'createdAt'>) => {
        const response = await axios.patch(`${BASE_URL}/${post.id}`, post)
        return response.data
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: number) => {
        const response = await axios.delete(`${BASE_URL}/${postId}`)
        if (response.status === 200) return +postId
        else return undefined
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

            const postToReact = state.entities[postId]

            if (postToReact) postToReact.reactions[reaction]++
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

                    postsAdapter.upsertMany(state, loadedPosts)
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
                    postsAdapter.addOne(state, action.payload)
                }
            )
            .addCase(
                updatePost.fulfilled,
                (
                    state,
                    action: PayloadAction<Omit<TPost, 'createdAt'> | undefined>
                ) => {
                    if (!action.payload?.id) {
                        console.log("Couldn't update post")
                        return
                    }
                    const updatedPost = {
                        ...action.payload,
                        createdAt: new Date().toISOString(),
                    } as TPost

                    postsAdapter.upsertOne(state, updatedPost)
                }
            )
            .addCase(
                deletePost.fulfilled,
                (state, action: PayloadAction<number | undefined>) => {
                    if (!action.payload) {
                        console.log("Couldn't delete post")
                        return
                    }
                    postsAdapter.removeOne(state, action.payload)
                }
            )
    },
})

export const {
    selectAll: selectAllPosts,
    selectIds: selectPostIds,
    selectById: selectPostById,
} = postsAdapter.getSelectors((state: TRootState) => state.posts)

export const selectPostsStatus = (state: TRootState) => state.posts.status
export const selectPostsError = (state: TRootState) => state.posts.error

export const selectUsersPosts = createSelector(
    [selectAllPosts, (_state: TRootState, userId: number) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { addNewReaction } = postsSlice.actions
export default postsSlice.reducer
