import { TPost } from '../types/post.type'
import PostAuthor from './post-author.component'
import PostDate from './post-date.component'
import PostReactions from './post-reactions.component'

interface IProps {
    post: TPost
}

const PostCard: React.FC<IProps> = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <PostDate date={post.date} />
            </p>
            <PostReactions postId={post.id} reactions={post.reactions} />
        </article>
    )
}

export default PostCard
