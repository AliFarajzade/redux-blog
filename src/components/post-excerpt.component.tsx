import moment from 'moment'
import { Link } from 'react-router-dom'
import { TPost } from '../types/post.types'
import PostAuthor from './post-author.component'
import ReactionButtons from './reaction-buttons.component'

interface IProps {
    post: TPost
    isPostPage?: boolean
}

const PostExcerpt: React.FC<IProps> = ({ post, isPostPage }) => (
    <article>
        <h3>{post.title}</h3>
        <p className="excerpt">{post.body}</p>
        <p className="postCredit">
            {!isPostPage && <Link to={`/post/${post.id}`}>Post Page</Link>}
            <Link to={`/post/edit/${post.id}`}>Edit Page</Link>
            <PostAuthor userId={post.userId} />
            <span>{moment(post.createdAt).fromNow()}</span>
        </p>
        <ReactionButtons post={post} />
    </article>
)

export default PostExcerpt
