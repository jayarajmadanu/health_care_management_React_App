import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, ADD_REPORT } from '../constants/url';
import { Redirect } from 'react-router';



export default function Report(props) {
    const query = new URLSearchParams(props.location.search);
    const bookingId = query.get('booking_id');

    const [report, setreport] = useState('')

    const handleChange =(e)=>{
        setreport(e.target.value);
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post(BASE_URL+ADD_REPORT,{
            report:report,
            bookingId:bookingId
        })
        .then(res=>console.log(res))
        .catch()  ;
        props.history.goBack()
    }

    return (
        <div>
            <h1>Add Report</h1>
            <form onSubmit={handleSubmit}>
                <lable>Report</lable>
                <input type='text' onChange={handleChange} />
                <input type='submit' value='Add report'/>
            </form>
        </div>
    )
}
