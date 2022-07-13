import { TReaction } from './reactions.types'

export type TPost = {
    id: number
    title: string
    body: string
    userId: number
    createdAt: string
    reactions: TReaction
}
