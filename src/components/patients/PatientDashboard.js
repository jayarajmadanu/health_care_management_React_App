import React from 'react'
import { useState } from 'react';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import bookAppointmentImg from '../../images/bookAppointment.png'
import yourApointmentsImg from '../../images/yourApointments.png'
import { Card } from 'react-bootstrap';
import './patientDashboardStyles.css'
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';

export default function Dashboard(props) {

    const [user, setuser] = useState({
        isLoggedIn:props.location.state.isLoggedIn,
        role:props.location.state.role
    })
    
    const logout =()=>{
        
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setuser({isLoggedIn:false,role:'none'})
        
    }

    const bookApointment=()=>{
        console.log(user.role)
        return (
            <Redirect to={{
                pathname:'/patients/bookApointment',
                state:{
                    isLoggedIn:user.isLoggedIn,
                    role:user.role
                }
         }} />
        )
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
        <div className="body"> 
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
            <div className='cardContainer'>
                <Card  className ='card'>
                    <Card.Img variant="top" src={bookAppointmentImg} width='30%' height='40%' />
                    <Card.Body>
                        <Card.Title>Wanna book appointment with doctor</Card.Title>
                        <Card.Text>
                            We have best doctors of different specifications for you to treate any kind of desease.
                        </Card.Text>
                        <a href='/patients/bookApointment'><Button className='cardButton'variant="primary" >Book Now</Button></a>
                    </Card.Body>
                </Card>
                <Card className ='card' >
                    <Card.Img variant="top" src={yourApointmentsImg} width='30%' height='40%'/>
                    <Card.Body>
                        <Card.Title>See your appointments</Card.Title>
                        <Card.Text>
                            Track your appointment details, status,doctor...
                        </Card.Text>
                        <a href='/patients/MyApointments'><Button className='cardButton' variant="primary">Check Now</Button></a>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
