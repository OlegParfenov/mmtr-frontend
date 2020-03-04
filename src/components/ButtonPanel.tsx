import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {IPostLikes} from '../interfaces/post.interface'
// IPostLikes
import '../scss/ButtonPanel.scss'

interface IButtonPanelProps {
    post: IPostLikes,
    onDislikeButton: any,
    onLikeButton: any
}

const ButtonPanel = (props: IButtonPanelProps): JSX.Element => {
    let {post, onDislikeButton, onLikeButton} = props;
    let likeButtonClass;
    post.liked ? likeButtonClass = 'button-toolbar__like-button button-toolbar__like-button_state_pressed' : likeButtonClass ='button-toolbar__like-button';
    return (
        <ButtonToolbar className='button-toolbar'>
            <span className={likeButtonClass}
                  onClick={() => onLikeButton(post.id)}
                  >♥</span>
            <Button variant='outline-primary' className='button-toolbar__not-like-button' size='sm'
                    onClick={() => onDislikeButton(post.id)}>Не нравится</Button>
        </ButtonToolbar>
    )
}

export default ButtonPanel