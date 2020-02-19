import React from 'react'
import Media from 'react-bootstrap/Media';
import '../scss/Post.scss';
import ButtonPanel from "./ButtonPanel";

function Post(props) {
    let {post, favorites} = props;

    return (
        <div>
            <Media className='post'>
                <Media.Body>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    <ButtonPanel post={post} favorites={favorites}/>
                </Media.Body>
            </Media>
        </div>
    )
}

export default Post