import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, updatePost } from '../redux/posts/post.slice'
import { useAppDispatch, useAppSelector } from '../redux/store'

import { selectPostById } from '../redux/posts/post.slice'
import { selectAllUsers } from '../redux/users/user.slice'

const EditPostPage = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useAppSelector(state => selectPostById(state, postId!))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState<string>(post?.title ?? '')
    const [content, setContent] = useState(post?.content ?? '')
    const [userId, setUserId] = useState(post?.userId ?? '')
    const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>(
        'idle'
    )

    const dispatch = useAppDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value)
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setUserId(e.target.value)

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')

                dispatch(
                    updatePost({
                        content,
                        date: post.date,
                        id: post.id,
                        reactions: post.reactions,
                        title,
                        userId,
                    })
                ).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost(postId!)).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
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
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button
                    className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </section>
    )
}

export default EditPostPage
