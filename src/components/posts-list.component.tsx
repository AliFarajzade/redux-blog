import { selectAllPosts } from '../redux/posts/post.slice'
import { useAppSelector } from '../redux/store'
import PostAuthor from './post-author.component'
import PostDate from './post-date.component'
import PostReactions from './post-reactions.component'

const PostsList: React.FC = () => {
    const posts = useAppSelector(selectAllPosts)

    const sortedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = sortedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <PostDate date={post.date} />
            </p>
            <PostReactions postId={post.id} reactions={post.reactions} />
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList
