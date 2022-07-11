import { TReaction } from './reactions.types'

export type TPost = {
    id: string
    title: string
    body: string
    authorId: string
    createdAt: string
    reactions: TReaction
}
