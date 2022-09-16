import { Link, useParams } from 'react-router-dom'
import { selectPostById, selectPostsStatus } from '../redux/posts/post.slice'
import { useAppSelector } from '../redux/store'
import PostCard from './post-card.component'

const SinglePostPage: React.FC = () => {
    const { postId } = useParams()

    const post = useAppSelector(state => selectPostById(state, postId!))
    const postsStatus = useAppSelector(selectPostsStatus)

    if (postsStatus === 'loading') return <h2>Loading...</h2>

    if (!post)
        return (
            <section>
                <h1>Post not found</h1>
                <Link to="/">Return to home page.</Link>
            </section>
        )

    return <PostCard postId={post.id} isPostPage />
}

export default SinglePostPage
