import { useDispatch } from 'react-redux'
import { addNewReaction } from '../redux/slices/posts.slice'
import { TPost } from '../types/post.types'

const reactionsEmojis = {
    thumbsUp: '👍',
    rocket: '🚀',
    wow: '😮',
    heart: '❤️',
    coffee: '☕️',
}

interface IProps {
    post: TPost
}

const ReactionButtons: React.FC<IProps> = ({ post }) => {
    const dispatch = useDispatch()

    const handleAddNewReaction = (
        reaction: 'wow' | 'rocket' | 'thumbsUp' | 'coffee' | 'heart',
        postId: number
    ) => dispatch(addNewReaction({ postId, reaction }))

    return (
        <div>
            {Object.entries(reactionsEmojis).map(([key, value]) => (
                <button
                    key={key}
                    type="button"
                    className="reactionButton"
                    onClick={() =>
                        handleAddNewReaction(
                            key as
                                | 'wow'
                                | 'rocket'
                                | 'thumbsUp'
                                | 'coffee'
                                | 'heart',
                            +post.id
                        )
                    }
                >
                    {value}{' '}
                    {
                        post.reactions[
                            key as
                                | 'wow'
                                | 'rocket'
                                | 'thumbsUp'
                                | 'coffee'
                                | 'heart'
                        ]
                    }
                </button>
            ))}
        </div>
    )
}

export default ReactionButtons
