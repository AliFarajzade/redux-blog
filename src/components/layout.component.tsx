import { Outlet } from 'react-router-dom'
import Header from './header.component'

const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout
