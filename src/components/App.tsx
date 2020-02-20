import React from 'react';
import Head from './Head';
import Post from './Post';
import {MyState} from '../interfaces/state.interface';
import {MyProps} from '../interfaces/props.interface';

// localStorage.dislikedIds = '[]';


class App extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        posts: result
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
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
                        {posts.map(post => (
                            <Post key={post.id} post={post}/>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default App