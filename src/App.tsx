import { Route, Routes } from 'react-router-dom'
import AddPost from './components/add-post.component'
import EditPostForm from './components/edit-post.component'
import Layout from './components/layout.component'
import PostsList from './components/posts-list.component'
import SinglePostPage from './components/single-post-page.component'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path="post">
                    <Route index element={<AddPost />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
