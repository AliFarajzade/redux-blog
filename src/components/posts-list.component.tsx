import { EntityId, nanoid } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import {
    selectPostIds,
    selectPostsError,
    selectPostsStatus,
} from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TRequestStatus } from '../types/request.types'
import PostExcerpt from './post-excerpt.component'

const PostsList: React.FC = () => {
    const orderedPostsIds = useSelector(selectPostIds)
    const postsStatus = useSelector<TRootState, TRequestStatus>(
        selectPostsStatus
    )
    const postsError = useSelector<TRootState, any>(selectPostsError)

    return (
        <section>
            <h2>Posts</h2>
            {postsStatus === 'loading' && <p>Loading...</p>}
            {postsStatus === 'succeeded' &&
                orderedPostsIds.map((postId: EntityId) => (
                    <PostExcerpt key={nanoid()} postId={postId} />
                ))}
            {postsStatus === 'failed' && <p>{postsError}</p>}
        </section>
    )
}

export default PostsList
