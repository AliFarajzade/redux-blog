import AddPostForm from './components/add-post-form.component'
import PostsList from './components/posts-list.component'

import { Navigate, Route, Routes } from 'react-router-dom'
import EditPostPage from './components/edit-post.component'
import Layout from './components/layout.component'
import SinglePostPage from './components/single-post-page.component'
import UsersPage from './components/user-page.component'
import UsersList from './components/users-list.component'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostPage />} />
                </Route>

                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UsersPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}

export default App
