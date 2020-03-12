import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {IPostLikes} from '../interfaces/post.interface'
// IPostLikes
import '../scss/ButtonPanel.scss'
import {Like} from "../types/Like";

interface IButtonPanelProps {
    post: IPostLikes,
    // onDislikeButton: any,
    // onLikeButton: any
    onClickButton: (id: number, key: Like) => void
}

const ButtonPanel = (props: IButtonPanelProps): JSX.Element => {
    let {post, onClickButton} = props;
    let likeButtonClass;
    post.liked ? likeButtonClass = 'button-toolbar__like-button button-toolbar__like-button_state_pressed' : likeButtonClass = 'button-toolbar__like-button';
    return (
        <ButtonToolbar className='button-toolbar'>
            <span className={likeButtonClass}
                  onClick={() => onClickButton(post.id, 'liked')}
            >♥</span>
            <Button variant='outline-primary' className='button-toolbar__not-like-button' size='sm'
                    onClick={() => onClickButton(post.id, 'disliked')}>Не нравится</Button>
        </ButtonToolbar>
    )
}

export default ButtonPanel