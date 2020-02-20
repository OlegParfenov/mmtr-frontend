import {PostInterface} from './post.interface';

export interface MyState {
    error: any
    isLoaded: boolean
    posts: PostInterface[]
}
