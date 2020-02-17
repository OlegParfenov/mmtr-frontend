import React from 'react';
import Head from './Head';
// import News from "./News";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <Head></Head>
                    <ul>
                        {items.map(item => (
                            <div>
                                {/*Где то тут по идее должен быть компонент News, я пока не успел сделать,*/}
                                {/* В него надо передать параметры и он уже отрисует*/}
                                <p>
                                    Title: {item.title}
                                </p>
                                <p>
                                    Body: {item.body}
                                </p>
                            </div>

                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default App