import React from 'react'
import '../scss/Head.scss'

let hello = 'Hello World';
function Head() {
    return (
        <div className='head'>
            <h1>{hello}</h1>
        </div>
    )
}

export default Head