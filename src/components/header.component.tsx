import { Link } from 'react-router-dom'
import { increaseCount, selectCount } from '../redux/posts/post.slice'
import { useAppDispatch, useAppSelector } from '../redux/store'

const Header: React.FC = () => {
    const count = useAppSelector(selectCount)

    const dispatch = useAppDispatch()

    return (
        <header>
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Posts</Link>
                    </li>
                    <li>
                        <Link to="/user">Users</Link>
                    </li>
                </ul>
                <button onClick={() => dispatch(increaseCount())}>
                    {count}
                </button>
            </nav>
        </header>
    )
}

export default Header
