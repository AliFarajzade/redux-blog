import { Route, Routes } from 'react-router-dom'
import AddPost from './components/add-post.component'
import EditPostForm from './components/edit-post.component'
import Layout from './components/layout.component'
import PostsList from './components/posts-list.component'
import SinglePostPage from './components/single-post-page.component'
import UserPage from './components/user.page'
import UsersList from './components/users-list.component'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>

                <Route path="post">
                    <Route index element={<AddPost />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                </Route>

                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                <Route path="*" element={<div>404</div>} />
            </Route>
        </Routes>
    )
}

export default App
