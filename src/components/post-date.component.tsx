import { formatDistanceToNow, parseISO } from 'date-fns'

interface IProps {
    date: string
}

const PostDate: React.FC<IProps> = ({ date }) => {
    const timeAgo = `${formatDistanceToNow(parseISO(date))} ago`

    return (
        <span title={date}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default PostDate
