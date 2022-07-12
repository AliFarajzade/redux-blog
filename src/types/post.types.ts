import { TReaction } from './reactions.types'

export type TPost = {
    id: number
    title: string
    body: string
    userId: string
    createdAt: string
    reactions: TReaction
}
