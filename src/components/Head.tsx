import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import '../scss/Head.scss'

function Head(): JSX.Element {
    // function showFavorites(): void {
    //     console.log('---' + JSON.parse(localStorage.favoritesIds));
    //     console.log('---' + JSON.parse(localStorage.dislikedIds));
    // }

    return (
        <Navbar bg="primary" variant="dark" className="head">
            <Navbar.Brand href="#home" className="head__brand">React</Navbar.Brand>
            <Form inline className="head__form">
                <FormControl type="text" placeholder="Поиск" className="mr-sm-2"/>
                <Button variant="outline-light">Поиск</Button>
                {/*<Button variant="outline-light" onClick={showFavorites}>Показать избранное</Button>*/}
            </Form>
        </Navbar>
    )
}

export default Head