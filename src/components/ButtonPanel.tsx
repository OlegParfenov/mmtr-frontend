import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {IPost, IPostLikes} from '../interfaces/post.interface'
import '../scss/ButtonPanel.scss'

interface IButtonPanelProps {
    post: IPost,
    onDislikeButton: any
}

const ButtonPanel = (props: IButtonPanelProps): JSX.Element => {
    let {post, onDislikeButton} = props;

    // function setUnPressedState(button: any): void {
    //     button.classList.remove('button-toolbar__like-button_state_pressed');
    //     deleteFavorites(post.id);
    // }

    // function deleteFavorites(id: number): void {
    //     if (localStorage.getItem('favoritesIds') !== null) {
    //         let favoritesIds = JSON.parse(localStorage.favoritesIds);
    //         let index = favoritesIds.findIndex(item => item === id);
    //         favoritesIds.splice(index, 1)
    //         //Здесь должна быть проверка
    //         localStorage.favoritesIds = JSON.stringify(favoritesIds);
    //     }
    // }

    // function setPressedState(button: any): void {
    //     button.classList.add('button-toolbar__like-button_state_pressed');
    //     setFavorites(post.id);
    // }

    const likeButtonClass = 'button-toolbar__like-button';
    return (
        <ButtonToolbar className='button-toolbar'>
            <span className={likeButtonClass}
                //   onClick={(e) => likeButtonChangeState(e)}
                  >♥</span>
            <Button variant='outline-primary' className='button-toolbar__not-like-button' size='sm'
                    onClick={() => onDislikeButton(post.id)}>Не нравится</Button>
        </ButtonToolbar>
    )
}

// function setFavorites(id: number): void {
//     if (localStorage.getItem('favoritesIds') !== null) {
//         let favoritesIds = JSON.parse(localStorage.favoritesIds);
//         let result = favoritesIds.filter(item => item === id);
//         if (result.length !== 1) {
//             favoritesIds.push(id);
//             localStorage.favoritesIds = JSON.stringify(favoritesIds);
//         }
//     }
// }


// function isLiked(id: number): boolean {
//     if (localStorage.getItem('favoritesIds') !== null) {
//         let favoritesIds = JSON.parse(localStorage.favoritesIds);
//         favoritesIds = favoritesIds.filter(item => item === id);
//         return favoritesIds.length > 0 ? true : false
//     }
// }

export default ButtonPanel