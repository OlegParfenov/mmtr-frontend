import React from 'react';
import Head from './Head';
import Post from './Post';
import {MyState} from '../interfaces/state.interface';
import {MyProps} from '../interfaces/props.interface';
// import {IPostLikes} from "../interfaces/post.interface";

class App extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
        };
    }

    onDislikeButton = (id: number) => {
        let newPosts = this.state.posts.map((post) => {
            return id === post.id ? {...post, disliked: true} : {...post};
        })
        this.setState({
            posts: newPosts
        })
        let newIds = newPosts
            .filter(post => post.disliked)
            .map(post => post.id);
        localStorage.dislikedIds = JSON.stringify(newIds);
    }

    dislikeFind(postId) {
        const dislikedIds = getDislikedIds();
        return !!dislikedIds.find(id => id === postId);
    }

    // deleteFavorites(id: number): void {
    //     if (localStorage.getItem('favoritesIds') !== null) {
    //         let favoritesIds = JSON.parse(localStorage.favoritesIds);
    //         let index = favoritesIds.findIndex(item => item === id);
    //         favoritesIds.splice(index, 1)
    //         //Здесь должна быть проверка
    //         localStorage.favoritesIds = JSON.stringify(favoritesIds);
    //     }
    // }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        posts: result.map(post => {
                            return ({
                                ...post,
                                disliked: this.dislikeFind(post.id)
                            })
                        })
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, posts} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <Head/>
                    <ul>
                        {posts
                            .filter(post => !post.disliked)
                            .map(post => (
                                    <Post
                                        key={post.id}
                                        post={post}
                                        onDislikeButton={this.onDislikeButton}/>
                                )
                            )}
                    </ul>
                </div>
            );
        }
    }
}

function getDislikedIds(): any {
    if (localStorage.getItem('dislikedIds') !== null) {
        let dislikedIds = JSON.parse(localStorage.dislikedIds);
        return dislikedIds
    } else return []
}

export default App