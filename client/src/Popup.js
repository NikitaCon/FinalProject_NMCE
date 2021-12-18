import React, { useState, useEffect } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';

// For real time
import io from 'socket.io-client'


// For uploading data
import axios from 'axios'

const socket = io('http://localhost:5000/');

const Popup = ({ setPopup, user, setUsers, setCardUser }) => {

    
    const [data, setData] = useState({
        name: '',
        dateAdded: '',
        desc: '',
        phone: ''
    });

    useEffect(() => {
        if(user) setData(user);
    }, [])


    const date = new Date();
    const storeDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`


    const addUser = () => {
        
        const uData = {
            name: data.name,
            dateAdded: storeDate,
            desc: data.desc,
            phone: data.phone,
        }

        
        // Now add user data using axios
        axios.post("http://localhost:5000/users/create", uData)

        // Making realtime using Socket.io
        socket.once('user-added', newData => {
            console.log(newData)
            setUsers((user) => ([...user, newData]))
        })
        
        
        setPopup(false)
    }



    const updateUser = () => {
        const uData = {
            name: data.name,
            dateAdded: data.dateAdded,
            desc: data.desc,
            phone: data.phone,
            _id: data._id
        }
        axios.put("http://localhost:5000/users/update",uData)

        socket.once('user-updated', (updatedData) => {
            setCardUser(updatedData)
        })

        setPopup(false)
    }

    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />
                <h3>Enter Employee details:</h3>
                <input type="text" placeholder='Enter Name'
                    value={data.name}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        name: e.target.value
                    }))}
                />
                <input type="text" placeholder='Enter Description'
                    value={data.desc}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        desc: e.target.value
                    }))}
                />
                <input type="number" placeholder='Enter Contact'
                    value={data.phone}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        phone: e.target.value
                    }))}
                />
                {!user ? (
                    <button onClick={addUser}>
                        Add Employee
                    </button>
                ): (
                        <button onClick={updateUser}>
                            Update Employee
                        </button>
                )}
                
            </div>
        </div>
    )
}

export default Popup
