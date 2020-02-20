import React from 'react'
import Media from 'react-bootstrap/Media';
import ButtonPanel from "./ButtonPanel";
import '../scss/Post.scss';
import {PostInterface} from '../interfaces/post.interface';

function Post(props: { post: PostInterface }): JSX.Element {
    let {post} = props;
    if (!isDisliked(post.id)) {
        return (
            <div>
                <Media className='post'>
                    <Media.Body>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                        <ButtonPanel post={post}/>
                    </Media.Body>
                </Media>
            </div>
        )
    } else {
        return <div></div>
    }
}

function isDisliked(id): boolean {
    let dislikedIds = JSON.parse(localStorage.dislikedIds);
    dislikedIds = dislikedIds.filter(item => item === id);
    return dislikedIds.length > 0 ? true : false
}

export default Post