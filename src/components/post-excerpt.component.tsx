import { EntityId } from '@reduxjs/toolkit'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostById } from '../redux/slices/posts.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'
import PostAuthor from './post-author.component'
import ReactionButtons from './reaction-buttons.component'

interface IProps {
    postId: EntityId
    isPostPage?: boolean
}

const PostExcerpt: React.FC<IProps> = ({ postId, isPostPage }) => {
    const post = useSelector<TRootState, TPost | undefined>(state =>
        selectPostById(state, postId)
    )

    return post ? (
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
    ) : (
        <div>Post not found</div>
    )
}

export default PostExcerpt
