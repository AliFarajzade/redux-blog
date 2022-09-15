import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNewPost } from '../redux/posts/post.slice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { selectAllUsers } from '../redux/users/user.slice'

const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>(
        'idle'
    )

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)

    const usersOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setRequestStatus('pending')

                const createdPost = await dispatch(
                    addNewPost({ title, content, userId })
                ).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${createdPost.id}`)
            } catch (error) {
                console.log('Failed to save the post', error)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value)
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setUserId(e.target.value)

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
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    disabled={!canSave}
                    onClick={onSavePostClicked}
                    type="button"
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm
