import React from 'react';
import Head from './Head';
import Post from './Post';
import { MyState } from '../interfaces/state.interface';
import { MyProps } from '../interfaces/props.interface';
import { Like } from "../types/Like";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

class App extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
        };
    }

    findPostId(postId: number, key: string) {
        const ids = getLSIds(key);
        return !!ids.find(id => id === postId);
    }

    onClickButton = (id: number, key: Like): void => {
        const newPosts = this.state.posts.map((post) => {
            if (key === 'disliked') {
                return id === post.id ? { ...post, disliked: true } : { ...post };
            }
            if (key === 'liked') {
                return id === post.id ? { ...post, liked: !post.liked } : { ...post };
            }
        })
        this.setState({
            posts: newPosts
        })
        let newIds = newPosts
            .filter(post => post[key])
            .map(post => post.id);
        localStorage.setItem(key + 'Ids', JSON.stringify(newIds))
    }

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
                                disliked: this.findPostId(post.id, 'dislikedIds'),
                                liked: this.findPostId(post.id, 'likedIds')
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
        const { error, isLoaded, posts } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        if (!isLoaded) {
            return (
                <div>
                    <Head />
                    <Container  className = 'container'>
                        <Spinner animation="border" variant="primary" />
                    </Container>
                </div>
            )
        }
        else {
            return (

                <div>
                    <Head />
                    <ul>
                        {posts
                            .filter(post => !post.disliked)
                            .map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    // onDislikeButton={this.onDislikeButton}
                                    // onLikeButton={this.onLikeButton}
                                    onClickButton={this.onClickButton}
                                />
                            )
                            )}
                    </ul>
                </div>
            );
        }
    }
}

function getLSIds(key: string): any {
    if (localStorage.getItem(key) !== null) {
        let arr = JSON.parse(localStorage.getItem(key));
        return arr
    } else return []
}

export default App