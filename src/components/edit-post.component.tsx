import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    deletePost,
    selectPostById,
    updatePost,
} from '../redux/slices/posts.slice'

import { selectAllUsers } from '../redux/slices/users.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector<TRootState, TPost | undefined>(state =>
        selectPostById(state, +postId!)
    )
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState<string>(post?.title ?? '')
    const [content, setContent] = useState<string>(post?.body ?? '')
    const [userId, setUserId] = useState<number>(post?.userId ?? 0)
    const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>(
        'idle'
    )

    const dispatch = useDispatch<any>()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value)
    const handleAuthorChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setUserId(Number(e.target.value))

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap()

                setTitle('')
                setContent('')
                setUserId(0)
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
            dispatch(deletePost(+postId!)).unwrap()

            setTitle('')
            setContent('')
            setUserId(0)
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
                    onChange={handleTitleChange}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={handleAuthorChange}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={handleContentChange}
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

export default EditPostForm
