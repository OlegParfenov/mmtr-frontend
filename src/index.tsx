import React from 'react'
import {render} from 'react-dom'
import './scss/helloworld.scss';

let hello = 'Hello World';


function HelloWord(){
    return(
        <div>
            <h1>{hello}</h1>
        </div>
    )
}
render(<HelloWord/>, document.getElementById('root'))

