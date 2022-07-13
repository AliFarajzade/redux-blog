import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import { fetchPosts } from './redux/slices/posts.slice'
import { fetchUsers } from './redux/slices/users.slice'
import { store } from './redux/store'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />} path="/*" />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
