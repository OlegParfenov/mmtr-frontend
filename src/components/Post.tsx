import React from 'react'
import Media from 'react-bootstrap/Media';
import ButtonPanel from "./ButtonPanel";
import '../scss/Post.scss';
import {IPost} from '../interfaces/post.interface';

interface IPostProps {
    post: IPost,
    onDislikeButton: any
}

const Post = (props: IPostProps): JSX.Element => {
    let {post, onDislikeButton} = props;

    return (
        <div>
            <Media className='content'>
                <Media.Body className='content__news'>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    <ButtonPanel post={post}
                                 onDislikeButton={onDislikeButton}/>
                </Media.Body>
            </Media>
        </div>
    )
}


export default Post