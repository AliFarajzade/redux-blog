import { EntityId } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { selectPostById } from '../redux/posts/post.slice'
import { useAppSelector } from '../redux/store'
import PostAuthor from './post-author.component'
import PostDate from './post-date.component'
import PostReactions from './post-reactions.component'

interface IProps {
    postId: EntityId
    isPostPage?: boolean
}

const PostCard: React.FC<IProps> = ({ postId, isPostPage }) => {
    const post = useAppSelector(state => selectPostById(state, postId))

    return post ? (
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
    ) : (
        <section>
            <h2>Post not found</h2>
        </section>
    )
}

export default PostCard
