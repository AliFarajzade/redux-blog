import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import postsReducer from './posts/post.slice'
import usersReducer from './users/user.slice'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
    },
})

// Getting store type
export type RootState = ReturnType<typeof store.getState>

// Typed hooks
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
