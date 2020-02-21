import React from 'react'
import Media from 'react-bootstrap/Media';
import ButtonPanel from "./ButtonPanel";
import '../scss/Post.scss';
import {PostInterface} from '../interfaces/post.interface';

function Post(props: { post: PostInterface, dislikedIds: number[], dislikedIdsChangeState: any }): JSX.Element {
    let {post, dislikedIds, dislikedIdsChangeState} = props;

    // if (!isDisliked(post.id)) 
        return (
            <div>
                <Media className='content'>
                    <Media.Body className = 'content__news'>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                        <ButtonPanel post={post}/>
                    </Media.Body>
                </Media>
            </div>
        )
    } 

// function isDisliked(id): boolean {
//     if (localStorage.getItem('dislikedIds') !== null){
//     let dislikedIds = JSON.parse(localStorage.dislikedIds);
//     dislikedIds = dislikedIds.filter(item => item === id);
//     return dislikedIds.length > 0 
//     }
// }

export default Post