import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'
import PostAuthor from './post-author.component'
import ReactionButtons from './reaction-buttons.component'

const PostsList: React.FC = () => {
    const posts = useSelector<TRootState, TPost[]>(selectAllPosts)

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <section>
            <h2>Posts</h2>
            {orderedPosts.map(post => (
                <article key={post.id}>
                    <h3>{post.title}</h3>
                    <p className="postCredit">
                        <PostAuthor userId={post.authorId} />
                        <span>{moment(post.createdAt).fromNow()}</span>
                    </p>
                    <p>{post.body}</p>
                    <ReactionButtons post={post} />
                </article>
            ))}
        </section>
    )
}

export default PostsList
