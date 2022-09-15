import { Link } from 'react-router-dom'
import { TPost } from '../types/post.type'
import PostAuthor from './post-author.component'
import PostDate from './post-date.component'
import PostReactions from './post-reactions.component'

interface IProps {
    post: TPost
    isPostPage?: boolean
}

const PostCard: React.FC<IProps> = ({ post, isPostPage }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>
                {isPostPage
                    ? post.content
                    : post.content.substring(0, 100) + '...'}
            </p>
            <p className="postCredit">
                {!isPostPage && (
                    <Link
                        style={{
                            color: 'cyan',
                            marginRight: '5px',
                        }}
                        to={`post/${post.id}`}
                    >
                        View post
                    </Link>
                )}
                <Link
                    style={{
                        color: 'coral',
                        marginRight: '5px',
                    }}
                    to={`post/edit/${post.id}`}
                >
                    Edit post
                </Link>
                <PostAuthor userId={post.userId} />
                <PostDate date={post.date} />
            </p>
            <PostReactions postId={post.id} reactions={post.reactions} />
        </article>
    )
}

export default PostCard
