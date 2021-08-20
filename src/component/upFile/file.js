import React, { useState, useEffect } from 'react'
import './file.css'
import upload from '../../firebase/index.js'
import fetchAPI from '../../utils/fetchAPI'
import removeVietnameseTones from './convertVNtoEN'

export default function File() {

    const [file, setFile] = useState(null)
    const [bookUrl, setBookUrl] = useState('')
    const [listBook, setListBook] = useState([])

    function handleChange(event) {
        const file = event.target.files[0]
        if(file.type !== 'application/pdf'){
            alert('PDF only')
        }
        setFile(file)
    }

    function handleUpload(event) {
        event.preventDefault()
        if(file.type === "application/pdf"){
            upload(file, (url) => {
                const data = {
                    name : removeVietnameseTones(file.name),
                    owner : localStorage.getItem('userId'),
                    url : url,
                    type : file.type
                }
                fetchAPI(`/addbook`, 'POST', data)
                .then(data => {
                    console.log(data)
                })
                setBookUrl(url)
            }) 
        } else {
            alert('PDF only')
        }
    }

    function selectSubmit(ev) {
        ev.preventDefault()
        const sel = document.getElementById('selectBook')
        const selected = sel.options[sel.selectedIndex].value
        setBookUrl(selected)
        const index = sel.options[sel.selectedIndex].text[0]
        fetchAPI(`/exacbook/${listBook[index]._id}`)
        .catch(err=>console.log(err))
        .then(data=> console.log(data))
    }

    useEffect(()=>{
        fetchAPI(`/listbook/${localStorage.getItem('userId')}/4`)
        .catch(err=>console.log(err.message))
        .then(data => {
            if(data.status){
                setListBook(data.listBook)
                if(data.listBook.length !== 0){
                    setBookUrl(data.listBook[0].url)
                }
            }
        })
    }, [])


    return (
        <div className="readFile">
            <div className="formContainer">
                <form onSubmit={handleUpload}>
                    <input type="file" id="uploadFile" onChange={handleChange} required={true} />
                    <input type="submit" />
                </form>
                <form onSubmit={selectSubmit}>
                    <select id="selectBook">
                        {
                            listBook.length === 0 ? <></> : listBook.map((el, index)=><option key={`b_${index}`} value={el.url}>{`${index}. ${el.name.substring(0, 9)}..`}</option>)
                        }
                    </select>
                    <input type="submit" />
                </form>
            </div>
            <div className="frame">
                <iframe src={bookUrl} width="99%" height="98%" title={file === null ? " " : file.name} id="frame"></iframe>
            </div>
        </div>
    )
}
