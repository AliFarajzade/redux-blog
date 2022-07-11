import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewPost } from '../redux/slices/posts.slice'

const AddPost: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setBody(e.target.value)

    const dispatch = useDispatch()

    const handleAddNewPost = () => {
        if (!title && !body) return

        dispatch(addNewPost(title, body))

        setTitle('')
        setBody('')
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={handleTitleChange}
                />
                {/* <label htmlFor="postAuthor">Author:</label> */}
                {/* <select id="postAuthor"> */}
                {/* <option value=""></option> */}
                {/* </select> */}
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={body}
                    onChange={handleBodyChange}
                />
                <button onClick={handleAddNewPost} type="button">
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPost
