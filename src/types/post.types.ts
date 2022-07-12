import { TReaction } from './reactions.types'

export type TPost = {
    id: string
    title: string
    body: string
    userId: string
    createdAt: string
    reactions: TReaction
}
