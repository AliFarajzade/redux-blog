import { reactToPost } from '../redux/posts/post.slice'
import { useAppDispatch } from '../redux/store'
import { TReaction } from '../types/post.type'

interface IProps {
    reactions: TReaction
    postId: string
}

const emojies: Record<keyof TReaction, string> = {
    coffee: '☕',
    heart: '❤️',
    rocket: '🚀',
    thumbsUp: '👍',
    wow: '😮',
}

const PostReactions: React.FC<IProps> = ({ reactions, postId }) => {
    const dispatch = useAppDispatch()

    const reactionButtons = Object.entries(emojies).map(([key, value]) => (
        <button
            key={key}
            type="button"
            className="reactionButton"
            onClick={() => {
                dispatch(
                    reactToPost({ postId, reaction: key as keyof TReaction })
                )
            }}
        >
            {value} {reactions[key as keyof TReaction]}
        </button>
    ))

    return <div>{reactionButtons}</div>
}

export default PostReactions
