import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {},
})

// Getting store type
export type RootState = ReturnType<typeof store.getState>

// Typed hooks
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
