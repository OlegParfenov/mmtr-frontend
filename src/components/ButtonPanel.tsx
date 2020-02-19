import React from 'react'
import '../scss/ButtonPanel.scss'
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

function ButtonPanel(props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let {post, favorites} = props;

    function likeButtonChangeState(likeButton) {
        likeButton = likeButton.target;
        const isPressed = likeButton.classList.contains('button-toolbar__like-button_state_pressed');
        isPressed ? setUnPressedState(likeButton) : setPressedState(likeButton);

        function setUnPressedState(button) {
            button.classList.remove('button-toolbar__like-button_state_pressed');
            // let id = favorites.findIndex(item => item === post.id);
            // favorites.splice(id, 1)
            deleteFavorites(post.id);
        }

        function setPressedState(button) {
            button.classList.add('button-toolbar__like-button_state_pressed');
            // favorites.push(post.id);
            setFavorites(post.id);
        }
    }
    if(isLiked(post.id)){
        return (
            <ButtonToolbar className='button-toolbar'>

            <span className='button-toolbar__like-button button-toolbar__like-button_state_pressed'
                  onClick={(e) => likeButtonChangeState(e)}>♥</span>

                <Button variant="outline-primary" className='button-toolbar__not-like-button' size="sm">Не нравится</Button>
            </ButtonToolbar>
        )
    }
    else{
        return (
            <ButtonToolbar className='button-toolbar'>

            <span className='button-toolbar__like-button'
                  onClick={(e) => likeButtonChangeState(e)}>♥</span>

                <Button variant="outline-primary" className='button-toolbar__not-like-button' size="sm">Не нравится</Button>
            </ButtonToolbar>
        )
    }

}


function setFavorites(id) {
    let favoritesIds = JSON.parse(localStorage.favoritesIds);

    //Здесь должна быть проверка
    let result = favoritesIds.filter(item=> item === id);
    if(result.length !== 1){
        favoritesIds.push(id);
        localStorage.favoritesIds = JSON.stringify(favoritesIds);
    }
}
function deleteFavorites(id) {
    let favoritesIds = JSON.parse(localStorage.favoritesIds);
    let index = favoritesIds.findIndex(item => item === id);
    favoritesIds.splice(index, 1)
    //Здесь должна быть проверка
    localStorage.favoritesIds = JSON.stringify(favoritesIds);
}

function isLiked(id) {
    let favoritesIds = JSON.parse(localStorage.favoritesIds);
    favoritesIds = favoritesIds.filter(item => item === id);
    //здесь исправить
    return favoritesIds.length > 0 ? true : false
}

export default ButtonPanel