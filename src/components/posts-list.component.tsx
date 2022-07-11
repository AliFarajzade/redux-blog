import { useSelector } from 'react-redux'
import { selectAllPosts } from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.type'

const PostsList: React.FC = () => {
    const posts = useSelector<TRootState, TPost[]>(selectAllPosts)

    return (
        <section>
            <h2>Posts</h2>
            {posts.map(post => (
                <article key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </article>
            ))}
        </section>
    )
}

export default PostsList
