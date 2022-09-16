import { nanoid } from '@reduxjs/toolkit'
import {
    selectPostIds,
    selectPostsError,
    selectPostsStatus,
} from '../redux/posts/post.slice'
import { useAppSelector } from '../redux/store'
import PostCard from './post-card.component'

const PostsList: React.FC = () => {
    const postsIds = useAppSelector(selectPostIds)
    const postsStatus = useAppSelector(selectPostsStatus)
    const postsError = useAppSelector(selectPostsError)

    let content

    if (postsStatus === 'loading') content = 'Loading...'
    if (postsStatus === 'succeeded') {
        content = postsIds.map(postId => (
            <PostCard key={nanoid()} postId={postId} />
        ))
    }
    if (postsStatus === 'failed')
        content = `Something went wrong: ${postsError}`

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
