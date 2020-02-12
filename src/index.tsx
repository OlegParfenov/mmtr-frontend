import React from 'react'
import {render} from 'react-dom'
import './scss/helloworld.scss';
function HelloWord(){
    return(
        <div>
            <h1>He Word</h1>
        </div>
    )
}
render(<HelloWord/>, document.getElementById('root'))