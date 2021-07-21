import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './listView.css'
import fetchAPI from '../../utils/fetchAPI'
import ListItem from './listItem'

export default function ListView(props) {
    let { groupId } = useParams()
    const [listWord, setListWord] = useState([])
    const [owner, setOwner] = useState('')
    const history = useHistory()

    useEffect(() => {
        if (props._id !== undefined) {
            groupId = props._id
        }
    }, [props])

    useEffect(() => {
        fetchAPI(`/getGroupWord/${groupId}`)
            .then(data => {
                if(data.status){
                    let userId = localStorage.getItem('userId')
                    if(userId === data.owner || data.shared){
                        setListWord(data.words)
                        setOwner(data.owner)
                    }
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [groupId])

    function remove(wordId, index) {

        let flag = window.confirm('Do you want to REMOVE this word.?')
        if (flag) {
            fetchAPI(`/remove/${groupId}/${wordId}`)
                .catch(err => console.log(err))
                .then(data => console.log(data))

            let list = listWord
            list.splice(index, 1)
            setListWord(list)
        }
    }

    function drop(ev){
        ev.preventDefault()
        let data = ev.dataTransfer.getData('text')
        data = JSON.parse(data)
        let flag = true
        let userId = localStorage.getItem('userId')
        listWord.forEach(el=>{
            if(el._id === data._id){
                flag = false
            }
        })
        if(flag && userId === owner ){
            fetchAPI(`/add/${groupId}/${data._id}`)
                .catch(err => console.log(err.message))
                .then(data => {
                    if(!data.status){
                        alert('Falied')
                    }
                })
            setListWord(prev => {
                return [
                    ...prev, data
                ]
            })
        }
    }

    function allowDrop(ev){
        ev.preventDefault()
    }

    return (
        <div className="listView" onDrop={drop} onDragOver={allowDrop}>
            <div className="btnContainer">
                <button onClick={() => {
                    history.go(0)
                }}>Reset</button>
                <button>Delete Group</button>
                <label>Shared<button>Off</button></label>
            </div>
            {
                listWord.length === 0 ? <h5>...</h5> : listWord.map((el, index) => <ListItem key={el._id} word={el} remove={remove} index={index} />)
            }
        </div>
    )
}
