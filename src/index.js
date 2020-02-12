import React from 'react'
import {render} from 'react-dom'
import './scss/helloworld.css';
function HelloWord(){
    return(
        <div>
            <h1>Hello Word</h1>
        </div>
    )
}
render(<HelloWord/>, document.getElementById('root'))