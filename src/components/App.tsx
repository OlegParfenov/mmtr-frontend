import React from 'react';
import Head from './Head';
import Post from './Post';

// localStorage.favoritesIds = '[]';

function getFavorites() {
    let favoritesIds = JSON.parse(localStorage.favoritesIds);
    return favoritesIds
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: [],
            favorites: getFavorites(),
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
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
        // @ts-ignore
        const {error, isLoaded, posts, favorites} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <Head favorites={favorites}/>
                    <ul className="list-unstyled">
                        {posts.map(post => (
                            <Post key={post.id} post={post} favorites={favorites}/>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default App