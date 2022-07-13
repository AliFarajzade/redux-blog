import { useSelector } from 'react-redux'
import { selectAllUsers } from '../redux/slices/users.slice'
import { TRootState } from '../redux/store'
import { TUser } from '../types/user.types'

interface IProps {
    userId: number
}

const PostAuthor: React.FC<IProps> = ({ userId }) => {
    const users = useSelector<TRootState, TUser[]>(selectAllUsers)

    const author = users.find(user => +user.id === userId)

    return <span>by {author?.name ?? 'Unknown'}</span>
}

export default PostAuthor
