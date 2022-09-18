import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TTodo } from '../types/todo.types'

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Todos'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7777' }),
    endpoints: builder => ({
        getTodos: builder.query<TTodo[], void>({
            query: () => '/todos',
            providesTags: ['Todos'],
            transformResponse: (res: TTodo[]) =>
                res.sort((a, b) => b.id - a.id),
        }),
        addTodo: builder.mutation<TTodo, Omit<TTodo, 'id'>>({
            query: todo => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation<TTodo, Pick<TTodo, 'id'> & Partial<TTodo>>(
            {
                query: todo => ({
                    url: `/todos/${todo.id}`,
                    method: 'PATCH',
                    body: todo,
                }),
                invalidatesTags: ['Todos'],
            }
        ),
        deleteTodo: builder.mutation<void, number>({
            query: id => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} = apiSlice

export default apiSlice
