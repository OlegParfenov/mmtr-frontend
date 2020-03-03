import {IPostLikes} from './post.interface';

export interface MyState {
    error: any
    isLoaded: boolean
    posts: IPostLikes[]
    dislikedIds: number[]
}
