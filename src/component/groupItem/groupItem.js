import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import './groupItem.css'

export default function GroupItem(props) {
    const [ItemData, setItemData] = useState({})
    const history = useHistory()

    useEffect(() => {
        const group = props.group || null
        setItemData(group)
    }, [props])

    function GotoList(){
        history.push(`/group/${ItemData._id}`)
    }
    return (
        
        <div className="groupItem">
            {
            ItemData.name==undefined?<p>Loading....</p>:<button onClick={GotoList}>
                <div className="name">
                    <p><strong>{ItemData.name}</strong></p>
                </div>
                <div className="topic">
                    <p>{ItemData.word.length} words</p>
                </div>
            </button>}
        </div>
    )
}
