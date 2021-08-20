import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './listView.css'
import fetchAPI from '../../utils/fetchAPI'
import ListItem from './listItem'
import XLSX from 'xlsx'

export default function ListView(props) {
    let { groupId } = useParams()
    const [listWord, setListWord] = useState([])
    const [owner, setOwner] = useState('')
    const history = useHistory()
    const [nameGroup, setNameGroup] = useState('')

    useEffect(() => {
        if (props._id !== undefined) {
            groupId = props._id
        }
    }, [props])

    useEffect(() => {
        fetchAPI(`/getGroupWord/${groupId}`)
            .then(data => {
                if (data.status) {
                    let userId = localStorage.getItem('userId')
                    if (userId === data.owner || data.shared) {
                        setListWord(data.words)
                        setOwner(data.owner)
                        setNameGroup(data.name)
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

    function drop(ev) {
        ev.preventDefault()
        let data = ev.dataTransfer.getData('text')
        data = JSON.parse(data)
        let flag = true
        let userId = localStorage.getItem('userId')
        listWord.forEach(el => {
            if (el._id === data._id) {
                flag = false
            }
        })
        if (flag && userId === owner) {
            fetchAPI(`/add/${groupId}/${data._id}`)
                .catch(err => console.log(err.message))
                .then(data => {
                    if (!data.status) {
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

    function allowDrop(ev) {
        ev.preventDefault()
    }

    function download() {
        let data = listWord.map((el, index) => {
            return {
                "STT": index + 1,
                "Word": el.word,
                "Phonetic" : el.phonetic,
                "Kind": el.kind,
                "Define": el.defineAndExample[0].define,
                "Example": el.defineAndExample[0].examples[0] || "none"
            }
        })

        let newWb = XLSX.utils.book_new();
        let newWS = XLSX.utils.json_to_sheet(data, {header : ["STT", "Word","Phonetic", "Kind", "Define", "Example"]});
        XLSX.utils.book_append_sheet(newWb, newWS, "Vocabulary")
        return XLSX.writeFile(newWb, `${nameGroup}.xlsx`)
    }

    return (
        <div className="listView" onDrop={drop} onDragOver={allowDrop}>
            <div className="btnContainer">
                <button>{nameGroup}</button>
                <button onClick={() => {
                    history.go(0)
                }}>Reset</button>
                <button>Delete Group</button>
                <label>Shared<button>Off</button></label>
                <button onClick={download}>Download as Excel</button>
            </div>
            
            {
                listWord.length === 0 ? <h5>...</h5> : listWord.map((el, index) => <ListItem key={el._id} word={el} remove={remove} index={index} />)
            }
        </div>
    )
}
