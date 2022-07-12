import { nanoid } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchPosts,
    selectAllPosts,
    selectPostsError,
    selectPostsStatus,
} from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'
import { TRequestStatus } from '../types/request.types'
import PostExcerpt from './post-excerpt.component'

const PostsList: React.FC = () => {
    const dispatch = useDispatch<any>()

    const posts = useSelector<TRootState, TPost[]>(selectAllPosts)
    const postsStatus = useSelector<TRootState, TRequestStatus>(
        selectPostsStatus
    )
    const postsError = useSelector<TRootState, any>(selectPostsError)

    useEffect(() => {
        if (postsStatus === 'idle') dispatch(fetchPosts())
    }, [postsStatus, dispatch])

    const orderedPosts =
        postsStatus === 'succeeded' &&
        posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <section>
            <h2>Posts</h2>
            {postsStatus === 'loading' && <p>Loading...</p>}
            {postsStatus === 'succeeded' &&
                (orderedPosts as TPost[]).map(post => (
                    <PostExcerpt key={nanoid()} post={post} />
                ))}
            {postsStatus === 'failed' && <p>{postsError}</p>}
        </section>
    )
}

export default PostsList
