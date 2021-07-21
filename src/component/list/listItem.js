import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './listView.css'

export default function ListItem(props) {
    const [word, setWord] = useState({})
    useEffect(() => {
        setWord(props.word)
    }, [props])

    function playPhon() {
        document.getElementById(word.phonetic).play()
    }
    
    function allowDrop(ev){
        ev.preventDefault()
    }

    function drag(ev){
        const data = JSON.stringify(word)
        ev.dataTransfer.setData('text', data)
    }

    return (
        <div className="listItem" onDragOver={allowDrop} draggable="true" onDragStart={drag}>
            {word._id == undefined ? <p>Loading.....</p> : <>
                <div className="word">
                    <div>
                        <Link to={`/word/${word._id}`}><strong>{word.word}</strong></Link>
                        <div className="deletebtn">
                            <Link to="#" onClick={()=>{props.remove(word._id, props.index)}}>Remove</Link>
                        </div>
                    </div>
                </div>
                <div className="phon">
                    <span>
                        <audio id={word.phonetic}>
                            <source src={word.sounds.ogg} type="audio/ogg" />
                            <source src={word.sounds.mp3} type="audio/mpeg" />
                        </audio>
                        <button onClick={playPhon}>{word.phonetic}</button>
                    </span>
                </div>
                <div className="define" id={`${word.word}`}>
                    <p>{word.defineAndExample[0].define}</p>
                </div>
            </>
            }
        </div>
    )
}
