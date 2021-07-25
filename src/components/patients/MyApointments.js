import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { BASE_URL, GET_MY_APOINTMENTS } from '../constants/url';
import { Redirect } from 'react-router';


export default function MyApointments() {

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const [apointments, setapointments] = useState([]);
    useEffect(() => {
        axios.post(BASE_URL+ GET_MY_APOINTMENTS ,{
            userId:user.userId
        })
        .then(res=>{
            setapointments(res.data.apointments);
            console.log(res.data.apointments)
        })
        .catch(err=>console.log(err))
    }, []);

    const logout =()=>{
        setuser({isLoggedIn:false,role:'none'})
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

      if(!user.isLoggedIn)
      return (<Redirect to="/" />);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >J-Hosp</Navbar.Brand>
                    <div className='menu'>
                        <Button variant="outline-primary" className='menuButton' onClick={handleOpen}>
                            <MenuIcon/>
                        </Button>
                        <FormControl >
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            hidden={!open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <a href = '/patients/Profile' style={{textDecoration:'none'}}><MenuItem >Profile</MenuItem></a>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </div>
                </Container>
            </Navbar>
            <div>
                <h1 style={{color:'#ff3333'}}>YOUR APOINTMENTS</h1>
            </div>
            <div style={{marginTop:'10px'}}>
                {
                    apointments.map((apointment,key)=>{
                        return(
                        <Card key={key} style={{width:'80%', height:'20%', margin:'auto',marginTop:'10px',boxShadow: '10px 10px 5px grey', backgroundColor:'#f2f2f2'}}>
                            <Card.Header style={{backgroundColor:'#00284d', color:'white'}}><b>Doc</b> {apointment.firstName+" "+apointment.lastName}</Card.Header>
                            <Card.Body>
                                <Card.Title><b>{apointment.specification}</b></Card.Title>
                                <Card.Text>
                                <p><b>Description  :</b>   {apointment.description}</p>
                                <p><b>Email  :</b>   {apointment.email}</p>
                                <p style={{color: (apointment.status=='Accepted')?'green':apointment.status=='Pending'?'#0052cc':'red'} } ><b>Status  :</b>   {apointment.status}</p>
                                <p><b>Date :</b>   {apointment.date} </p>
                                <p><b>Time :</b>   {apointment.time} </p>
                                </Card.Text>
                                <a href = {'/patients/report?bookingId='+apointment.doc_id} ><Button disabled={apointment.status!='Completed'}>Report</Button></a>
                            </Card.Body>
                        </Card>
                        )
                    })
                }
                
            </div>
        </div>
    )
}
