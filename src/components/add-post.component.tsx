import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost } from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TUser } from '../types/user.types'

const AddPost: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [authorId, setAuthorId] = useState<string>('')
    const [createPostStatus, setCreatePostStatus] = useState<
        'pending' | 'idle'
    >('idle')

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setBody(e.target.value)
    const handleChangeAuthor = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setAuthorId(e.target.value)

    const users = useSelector<TRootState, TUser[]>(state => state.users)

    const dispatch = useDispatch<any>()

    const canPost =
        !(!title || !body || !authorId) && createPostStatus === 'idle'

    const handleAddNewPost = async () => {
        if (!canPost) return

        try {
            setCreatePostStatus('pending')
            dispatch(
                createNewPost({
                    body,
                    title,
                    createdAt: new Date().toISOString(),
                    userId: +authorId,
                    reactions: {
                        coffee: 0,
                        heart: 0,
                        rocket: 0,
                        thumbsUp: 0,
                        wow: 0,
                    },
                })
            ).unwrap()

            setTitle('')
            setAuthorId('')
            setBody('')
        } catch (error) {
            console.log(error)
        } finally {
            setCreatePostStatus('idle')
        }
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
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={authorId}
                    onChange={handleChangeAuthor}
                >
                    <option value=""></option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={body}
                    onChange={handleBodyChange}
                />
                <button
                    disabled={!canPost}
                    onClick={handleAddNewPost}
                    type="button"
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPost
