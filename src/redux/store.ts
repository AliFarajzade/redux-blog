import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './slices/posts.slice'
import usersSlice from './slices/users.slice'

export const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
    },
})

export type TRootState = ReturnType<typeof store.getState>
