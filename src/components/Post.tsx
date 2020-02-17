import React from 'react'
import Media from 'react-bootstrap/Media';
import '../scss/Post.scss';
import LikeButton from "./LikeButton";

function Post(props) {
    let {post} = props;
    return (
        <div>
            <Media className='post'>
                {/*<img*/}
                {/*    width={64}*/}
                {/*    height={64}*/}
                {/*    className="mr-3"*/}
                {/*    src="holder.js/64x64"*/}
                {/*    alt="Generic placeholder"*/}
                {/*/>*/}
                <Media.Body>
                    <h5>{post.title}</h5>
                    <p>{post.body}</p>
                    <LikeButton/>
                </Media.Body>
            </Media>
        </div>
    )
}

export default Post