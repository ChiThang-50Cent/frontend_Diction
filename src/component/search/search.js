import React, { useEffect, useState } from 'react'
import fetchAPI from '../../utils/fetchAPI'
import './search.css'
import Word from '../word/word'
import ListView from '../list/listView'
import { useHistory } from 'react-router-dom'

export default function Search() {
    // view 0 : search view
    // view 1 : group view
    // view 2 : word view
    const [view, setview] = useState(0)
    const [result, setResult] = useState({})
    const [groupSearch, setGroupSearch] = useState([])
    const [state, setstate] = useState('')
    const history = useHistory()

    function submit(ev) {
        ev.preventDefault()
        let value = document.querySelector('.searchField form>input[name="search"]').value
        if (!(value.includes('\\') || value.includes('/'))) {
            fetchAPI(`/search/${value}`)
                .catch(err => console.log(err.message))
                .then(data => {
                    setview(0)
                    setResult(data)
                })
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        fetchAPI(`/getUserGroup/${userId}`)
            .catch(err => console.log(err.message))
            .then(data => {
                setGroupSearch(data)
            })
    }, [])

    function gotoWord(word) {
        setview(2)
        setstate(word._id)
    }

    function gotoGroup(group) {
        setview(1)
        setstate(group._id)
    }

    function selected(ev) {
        ev.preventDefault()
        let sel = document.querySelector('#root > div > div.mainContainer > div.searchField > div.wordSearch > form > select')
        let selected = sel.options[sel.selectedIndex].value
        if (selected !== "0") {
            fetchAPI(`/add/${selected}/${state}`)
                .catch(err => console.log(err.message))
                .then(data => {
                    if (data.status) {
                        alert('Success')
                    } else {
                        alert('Failed')
                    }
                })
        } else {
            const userId = localStorage.getItem('userId')
            const name = document.getElementById('newGroupInput').value
            fetchAPI(`/create/${name}/${userId}`)
            .catch(err=>console.log(err.message))
            .then(groupData=>{
                if(groupData.status){
                    fetchAPI(`/add/${groupData.group._id}/${state}`)
                    .catch(err => console.log(err.message))
                    .then(data => {
                    if (data.status) {
                        alert('Success')
                    } 
                })
                }
            })
        }
    }

    return (
        <div className="searchField">
            <div>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Search" name='search' required='true' />
                    <input type="submit" value="Search" />
                </form>
            </div>
            {
                view === 0 ? <ul className="result">
                    <li>Word</li>
                    <ul>
                        {
                            result.words === undefined ? <></> : result.words.map((el, index) => <li key={`vw${index}`} onClick={() => { gotoWord(el) }}>{el.word}</li>)
                        }
                    </ul>
                    <li>Group</li>
                    <ul>
                        {
                            result.groups === undefined ? <></> : result.groups.length === 0 ? <></> : result.groups.map((el, index) => <li key={`vg${index}`} onClick={() => { gotoGroup(el) }}>{el.name}</li>)
                        }
                    </ul>

                </ul>
                    : view === 2 ? <div className="wordSearch">
                        <form onSubmit={selected}>
                            <select name="selected" >
                                {
                                    groupSearch.map((el, index) => <option key={'op_' + index} value={el._id}>{el.name}</option>)
                                }
                                <option value={0}>New</option>
                            </select>
                            <input placeholder="Add new group.?" id="newGroupInput" />
                            <input type="submit" value="Apply" />
                        </form>
                        <Word _id={state} />
                    </div>
                        : view === 1 ? <div className="groupSearch">
                            <div style={{ textAlign: "center" }}><button>Clone group</button></div>
                            <ListView _id={state} />
                        </div> : <></>
            }
        </div>
    )
}
