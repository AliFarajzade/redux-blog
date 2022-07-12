import moment from 'moment'
import { TPost } from '../types/post.types'
import PostAuthor from './post-author.component'
import ReactionButtons from './reaction-buttons.component'

interface IProps {
    post: TPost
}

const PostExcerpt: React.FC<IProps> = ({ post }) => (
    <article>
        <h3>{post.title}</h3>
        <p className="postCredit">
            <PostAuthor userId={post.userId} />
            <span>{moment(post.createdAt).fromNow()}</span>
        </p>
        <p>{post.body}</p>
        <ReactionButtons post={post} />
    </article>
)

export default PostExcerpt
