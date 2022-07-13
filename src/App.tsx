import AddPost from './components/add-post.component'
import PostsList from './components/posts-list.component'

const App: React.FC = () => {
    return (
        <main className="App">
            <AddPost />
            <PostsList />
        </main>
    )
}

export default App
