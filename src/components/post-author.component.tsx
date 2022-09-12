import { useSelector } from 'react-redux'
import { selectAllUsers } from '../redux/users/user.slice'

interface IProps {
    userId?: string
}

const PostAuthor: React.FC<IProps> = ({ userId }) => {
    const users = useSelector(selectAllUsers)

    const author = userId && users.find(user => user.id === userId)

    return <span>by {author ? author.name : 'Unknown author'}</span>
}
export default PostAuthor
