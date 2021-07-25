import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation'
import { BASE_URL, GET_DOCTORS_PENDING_APOINTMENTS, UPDATE_BOOKING } from '../constants/url';
import { Card } from 'react-bootstrap';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';


export default function PendingApointments(props) {

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const [data, setdata] = useState([])
    useEffect(() => {
       axios.post(BASE_URL+ GET_DOCTORS_PENDING_APOINTMENTS,{
            docId: user.userId
       })
       .then(res=>{
           setdata(res.data.apointments);
           console.log(res)
        })
       .catch()
    }, [])

    const handleBooking = (b, v)=>{
        axios.post(BASE_URL+UPDATE_BOOKING,{
            bookingId:b,
            status: v
        })
        .then(res=>console.log(res))
        .catch();
        window.location.reload(false);
    }

    if(!user.isLoggedIn){
        return (<Redirect to="/" />);
    }
    return (
        <div>
            <Navigation/>
            <div>
                <h1>Pending Apointments</h1>
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
                                    <Button type='submit' style={{margin:'4px'}} variant="success" onClick={()=>{return handleBooking(apointment.doc_id, 'Accepted')}} >Accept</Button>
                                    <Button type='submit' style={{margin:'4px'}} variant="danger"onClick={()=>{return handleBooking(apointment.doc_id, 'Rejected')}} >Reject</Button>
                                </Card.Body>
                            </Card>
                            )
                        })
                    }
                
            </div>
        </div>
    )
}
