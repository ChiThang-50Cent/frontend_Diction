// Side Info is componet contain infomation of user, group and log out button
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import '../sideInfo/sideInfo.css'
import fetchAPI from '../../utils/fetchAPI.js'
import { Link } from 'react-router-dom'

export default function SideInfo() {

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
                            <input type="text" placeholder="name" required={true} id="name" />
                            <input type="submit" value="Create" />
                        </form>
                    </li>
                    <li><Link to={`/`}><h4>Group</h4></Link></li><hr />
                    <li><Link to={`/book`}><h4>Upload File</h4></Link></li><hr />
                    <li><Link to={`/manage`}><h4>Manage File</h4></Link></li><hr />
                </ul>
            </div>
            <div className="logOutbtn">
                <button>Log Out</button>
            </div>
        </div>
    )
}
