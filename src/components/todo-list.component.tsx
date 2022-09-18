import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from '../redux/api.slice'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState<string>('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTodo({ title: newTodo, userId: 1, completed: false })
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    if (isLoading) content = <p>Loading...</p>
    if (isSuccess)
        content = todos.map(todo => (
            <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={String(todo.id)}
                        onChange={() =>
                            updateTodo({ ...todo, completed: !todo.completed })
                        }
                    />
                    <label htmlFor={String(todo.id)}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo(todo.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        ))
    if (isError) {
        content = <p>Something went wrong</p>
        console.log(error)
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList
