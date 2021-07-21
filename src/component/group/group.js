import React, { useEffect, useState } from 'react'
import './group.css'
import GroupItem from '../groupItem/groupItem'
import fetchAPI from '../../utils/fetchAPI'

export default function Group() {

    const [listGroup, setListGroup] = useState([])
    useEffect(() => {
        //fetch list group of onwer
        //after that, set them into State
        const userId = localStorage.getItem('userId')
        fetchAPI(`/getUserGroup/${userId}`)
        .then(data=>{
            setListGroup(data)
        })
        .catch(err=>{
            console.log(err.message)
        })
        
    }, [])
        //render list group as GroupItem component
    return (
        <div className = "mainGroup">
            {listGroup.map(el=><GroupItem key={el._id} group={el}/>)}
        </div>
    )
}
