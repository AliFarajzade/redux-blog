import { EntityId } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import PostExcerpt from './post-excerpt.component'

const SinglePostPage: React.FC = () => {
    const { postId } = useParams()

    return postId ? (
        <PostExcerpt postId={postId as EntityId} isPostPage />
    ) : (
        <section>
            <h2>Post not found!</h2>
        </section>
    )
}

export default SinglePostPage
