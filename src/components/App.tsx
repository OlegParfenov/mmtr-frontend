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
            dislikedIds: getDislikedIds(),
        };
    }

    onDislikeButton = (id: number)  => {
        if (localStorage.getItem('dislikedIds') !== null) {
            let dislikedIds = JSON.parse(localStorage.dislikedIds);
            let result = dislikedIds.filter(item => item === id);

            if (result.length !== 1) {
                dislikedIds.push(id);
                localStorage.dislikedIds = JSON.stringify(dislikedIds);
                this.deleteFavorites(id);
                this.setState({
                    dislikedIds: dislikedIds
                })
                console.log(localStorage.dislikedIds);
            }
        }
    }

    dislikeCheck(posts) {
        const dislikedIds = getDislikedIds();
        return posts.filter(item => !!!dislikedIds.find((id)=>{
            return id === item.id;
        }));
    }
    deleteFavorites(id: number): void {
        if (localStorage.getItem('favoritesIds') !== null) {
            let favoritesIds = JSON.parse(localStorage.favoritesIds);
            let index = favoritesIds.findIndex(item => item === id);
            favoritesIds.splice(index, 1)
            //Здесь должна быть проверка
            localStorage.favoritesIds = JSON.stringify(favoritesIds);
        }
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
        const filteredPosts = this.dislikeCheck(posts);

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <Head/>
                    <ul>
                        {filteredPosts.map(post => (
                            <Post key={post.id}
                                  post={post}
                                  // dislikedIds={dislikedIds}
                                  onDislikeButton={this.onDislikeButton}/>
                        ))}
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
    }
    else return []
}

export default App