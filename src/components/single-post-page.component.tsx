import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectPostById } from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'
import PostExcerpt from './post-excerpt.component'

const SinglePostPage: React.FC = () => {
    const { postId } = useParams()

    const post = useSelector<TRootState, TPost | undefined>(state =>
        selectPostById(state, +postId!)
    )

    return post ? (
        <PostExcerpt post={post} isPostPage />
    ) : (
        <section>
            <h2>Post not found!</h2>
        </section>
    )
}

export default SinglePostPage
