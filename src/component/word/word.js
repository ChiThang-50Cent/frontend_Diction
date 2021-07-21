import React, { useState, useEffect } from 'react'
import './word.css'
import { useParams } from 'react-router-dom'
import fetchAPI from '../../utils/fetchAPI.js'

export default function Word(props) {

    const [wordData, setwordData] = useState({})
    let { wordId } = useParams()
    
    useEffect(() => {
        if(props._id !== undefined){
            wordId = props._id
        }
    }, [props])

    useEffect(() => {
        fetchAPI(`/getWord/${wordId}`)
            .then(data => setwordData(data))
            .catch(err => console.log(err.message))
    }, [wordId])

    function playbtn(){
        document.getElementById(wordData.phonetic).play()
    }

    function allowDrop(ev){
        ev.preventDefault()
    }

    function drag(ev){
        const data = JSON.stringify(wordData)
        ev.dataTransfer.setData('text', data)
    }

    return (
        <div className="wordContainer" onDragOver={allowDrop} draggable='true' onDragStart={drag} >
            <div className="word">
                <h1>{wordData.word}</h1>
            </div>
            <div className="phone">
                {
                    wordData.sounds === undefined ? <></>
                        : <audio id={wordData.phonetic}>
                            <source src={wordData.sounds.mp3} type="audio/mpeg" />
                            <source src={wordData.sounds.ogg} type="audio/ogg" />
                        </audio>
                }
                <button onClick={playbtn}>{wordData.phonetic}</button>
                <p><span>{wordData.kind}</span></p>
            </div>
            <ul className="define">
                {
                    wordData.defineAndExample === undefined ? <></>
                        : wordData.defineAndExample.map((el, index) => {
                            return <>
                                <li key={index}><p>{el.define}</p></li>

                                <ul className="exampleblock">
                                    {
                                        el.examples.length === 0 ? <></>
                                            : el.examples.map((ele, index) => <li key={`@${index}`}>
                                                {ele}
                                            </li>)
                                    }
                                </ul>

                            </>
                        })
                }
            </ul>
            {
                wordData.idioms === undefined ? <></>
                : <div className="idioms">
                    <h1>Idioms</h1>
                    <ul className="idm">
                        {
                            wordData.idioms.map((el, index)=><li key={`q${index}`}>
                                <h2>{el.idiom}</h2>
                                <ul className = "define">
                                    {
                                        el.defineAndExample.length === 0 ? <></>
                                        : el.defineAndExample.map((ele, index)=>
                                            <>
                                                <li key={`li${index}`}><p>{ele.define}</p></li>
                                                <ul>
                                                    {
                                                        ele.examples.length === 0 ? <></>
                                                            : ele.examples.map((el => <li>{el}</li>))
                                                    }
                                                </ul>
                                            </>  
                                        )
                                    }
                                </ul>
                            </li>)
                        }
                    </ul>
                </div>
            }
        </div>
    )
}
