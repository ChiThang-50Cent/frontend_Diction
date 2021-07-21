import React, {} from 'react'
import '../main/maintemp.css'

export default function Maintemp(props) {
    return (
        <div className = 'mainContainer'>
            {props.children}
        </div>
    )
}
