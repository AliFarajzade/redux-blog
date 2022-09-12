import AddPostForm from './components/add-post-form.component'
import PostsList from './components/posts-list.component'

const App: React.FC = () => {
    return (
        <main className="App">
            <AddPostForm />
            <PostsList />
        </main>
    )
}

export default App
