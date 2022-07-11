import AddPost from './components/add-post.component'
import PostsList from './components/posts-list.component'

const App: React.FC = () => {
    return (
        <main className="App">
            <PostsList />
            <AddPost />
        </main>
    )
}

export default App
