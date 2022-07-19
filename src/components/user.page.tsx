import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../redux/slices/users.slice'
import { TRootState } from '../redux/store'
import { TPost } from '../types/post.types'
import { TUser } from '../types/user.types'

const UserPage: React.FC = () => {
    const { userId } = useParams()
    const user = useSelector<TRootState, TUser | undefined>(state =>
        selectUserById(state, +userId!)
    )

    const usersPosts = useSelector<TRootState, TPost[]>(state => {
        const allPosts = state.posts.posts
        return allPosts.filter(post => +post.userId === +userId!)
    })

    return (
        <section>
            <h2>{user?.name}</h2>
            <ul>
                {usersPosts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UserPage
