import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation'
import { BASE_URL, GET_DOCTORS_TODAYS_APOINTMENTS } from '../constants/url';
import { Card } from 'react-bootstrap';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

export default function DoctorDashboard() {

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const [data, setdata] = useState([])
    useEffect(() => {
       axios.post(BASE_URL+ GET_DOCTORS_TODAYS_APOINTMENTS,{
            docId: user.userId
       })
       .then(res=>{
           setdata(res.data.apointments);
           console.log(res)
        })
       .catch()
    }, [])

    if(!user.isLoggedIn){
        return (<Redirect to="/" />);
    }

    return (
        <div>
            <Navigation/>
            <div>
                <h1>Todays Apointments</h1>
                {
                    data.map((apointment,key)=>{
                        return(
                            <Card key={key} style={{width:'80%', height:'20%', margin:'auto',marginTop:'10px',boxShadow: '10px 10px 5px grey', backgroundColor:'#f2f2f2'}}>
                                <Card.Header style={{backgroundColor:'#00284d', color:'white'}}><b>Name</b> {apointment.firstName+" "+apointment.lastName}</Card.Header>
                                <Card.Body>
                                    <Card.Title><b>Description  :</b><b>{apointment.description}</b></Card.Title>
                                    <Card.Text>
                                    <p><b>Email  :</b>   {apointment.email}</p>
                                    <p><b>Date :</b>   {apointment.date} </p>
                                    <p><b>Time :</b>   {apointment.time} </p>
                                    </Card.Text>
                                    <a href={'/doctor/report?booking_id='+apointment.doc_id}><Button >Add Report</Button></a>
                                </Card.Body>
                            </Card>
                            )
                        })
                    }
                
            </div>
        </div>
    )
}
