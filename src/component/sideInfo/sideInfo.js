// Side Info is componet contain infomation of user, group and log out button
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import '../sideInfo/sideInfo.css'
import fetchAPI from '../../utils/fetchAPI.js'
import { Link } from 'react-router-dom'

export default function SideInfo() {

    const [ListGroup, setListGroup] = useState([])
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        fetchAPI(`/getUserGroup/${userId}`)
            .then(data => {
                setListGroup(data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])

    function createNew(){
        let name = document.getElementById('name').value
        let userId = localStorage.getItem('userId')

        fetchAPI(`/create/${name}/${userId}`)
        .catch(err=>console.log(err))
        .then(data=>console.log(data))
    }

    return (
        <div className="sideInfo">
            <div className="userInfo">
                <img src="logo192.png" />
                <div className="nameEmail">
                    <div className="name">
                        Nguyễn Chí Thắng
                    </div>
                    <div className="email">
                        Chithang.nydo@gmail.com
                    </div>
                </div>
            </div>
            <div className="groupContain">
                <ul className="list">
                    <li>
                        <form onSubmit={createNew}>
                            <label>New Group</label><br />
                            <input type="text" placeholder="name" required="true" id="name" />
                            <input type="submit" value="Create" />
                        </form>
                    </li>
                    {ListGroup.length == 0 ? <></>
                        : ListGroup.map(el => <li key={el.name}><Link to={`/group/${el._id}`}><h3>{el.name}</h3><hr /></Link></li>)
                    }
                </ul>
            </div>
            <div className="logOutbtn">
                <button>Log Out</button>
            </div>
        </div>
    )
}
