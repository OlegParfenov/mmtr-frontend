import React from 'react'
import Media from 'react-bootstrap/Media';
import ButtonPanel from "./ButtonPanel";
import '../scss/Post.scss';
import {IPostLikes} from '../interfaces/post.interface';
import {Like} from "../types/Like";

interface IPostProps {
    post: IPostLikes,
    onClickButton: (id: number, key: Like) => void
    // onDislikeButton: any,
    // onLikeButton: any
}

const Post = (props: IPostProps): JSX.Element => {
    let {post, onClickButton} = props;

    return (
        <div>
            <Media className='content'>
                <Media.Body className='content__news'>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    <ButtonPanel post={post}
                                 // onDislikeButton={onDislikeButton}
                                 // onLikeButton={onLikeButton}
                                 onClickButton={onClickButton}
                    />
                </Media.Body>
            </Media>
        </div>
    )
}


export default Post