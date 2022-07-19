import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from '../redux/slices/users.slice'
import { TRootState } from '../redux/store'
import { TUser } from '../types/user.types'

const UsersList: React.FC = () => {
    const users = useSelector<TRootState, TUser[]>(selectAllUsers)

    return (
        <section>
            <h2>Users</h2>

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UsersList
