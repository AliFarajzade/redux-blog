export type TReaction = {
    heart: number
    thumbsUp: number
    wow: number
    rocket: number
    coffee: number
}

export type TPost = {
    id: string
    title: string
    content: string
    userId?: string
    date: string
    reactions: TReaction
}
