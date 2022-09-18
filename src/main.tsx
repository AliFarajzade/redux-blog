import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import apiSlice from './redux/api.slice'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApiProvider api={apiSlice}>
            <App />
        </ApiProvider>
    </React.StrictMode>
)
