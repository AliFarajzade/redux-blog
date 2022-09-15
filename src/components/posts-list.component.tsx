import { nanoid } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import {
    fetchAllPosts,
    selectAllPosts,
    selectPostsError,
    selectPostsStatus,
} from '../redux/posts/post.slice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import PostCard from './post-card.component'

const PostsList: React.FC = () => {
    const posts = useAppSelector(selectAllPosts)
    const postsStatus = useAppSelector(selectPostsStatus)
    const postsError = useAppSelector(selectPostsError)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (postsStatus === 'idle') dispatch(fetchAllPosts())
    }, [postsStatus, dispatch])

    let content

    if (postsStatus === 'loading') content = 'Loading...'
    if (postsStatus === 'succeeded') {
        const sortedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))

        content = sortedPosts.map(post => (
            <PostCard key={nanoid()} post={post} />
        ))
    }
    if (postsStatus === 'failed')
        content = `Something went wrong: ${postsError}`

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
