import React, { useState, useEffect } from 'react'
import fetchAPI from '../../utils/fetchAPI'
import './manageFile.css'

export default function ManageFile() {
    const [listBook, setListBook] = useState([])

    useEffect(() => {
        fetchAPI(`/listbook/${localStorage.getItem('userId')}/0`)
            .catch(err => console.log(err.message))
            .then(data => {
                if (data.status) {
                    setListBook(data.listBook)
                }
            })
    }, [])

    return (
        <div className="managefile">
            <div className="noti"></div>
            <div className="listfile">
                <ul>
                    {
                        listBook.length === 0 ? <></>
                            : listBook.map((el, index) => <li key={`b__${index}`} id={`b__${index}`}>
                                <a href={el.url} target="_blank"><h4>{el.name}</h4></a>
                            </li>)
                    }
                </ul>
            </div>
            {/* <div>
                <iframe width="99%" height="98%"></iframe>
            </div> */}
        </div>
    )
}
