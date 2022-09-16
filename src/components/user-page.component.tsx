import { Link, useParams } from 'react-router-dom'
import { selectUsersPosts } from '../redux/posts/post.slice'
import { useAppSelector } from '../redux/store'
import { selectUserById } from '../redux/users/user.slice'

const UsersPage: React.FC = () => {
    const { userId } = useParams()
    const user = useAppSelector(state => selectUserById(state, userId!))

    const usersPosts = useAppSelector(state => selectUsersPosts(state, userId!))

    if (!user)
        return (
            <section>
                <h1>User not found.</h1>
                <Link to="/user">View users</Link>
            </section>
        )

    const postsTitles = usersPosts.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user.name} posts:</h2>
            {postsTitles}
        </section>
    )
}

export default UsersPage
