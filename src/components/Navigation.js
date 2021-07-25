import React, { useState } from 'react';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import { Redirect } from 'react-router';


export default function Navigation(props) {
    
    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const logout =()=>{
        
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setuser({isLoggedIn:false,role:'none'})
        
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };
    
    if(!user.isLoggedIn){
        return (<Redirect to="/" />);
    }
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
                            <a href = '/doctor/acceptedApointments' style={{textDecoration:'none'}} hidden={user.role!='doctor'}><MenuItem >Accepted Apointments</MenuItem></a>
                            <a href = '/doctor/pendingApointments' style={{textDecoration:'none'}} hidden={user.role!='doctor'} ><MenuItem >Pending Apointments</MenuItem></a>
                            <a href = '/admin/addDoctor' style={{textDecoration:'none'}} hidden={user.role!='admin'} ><MenuItem >Add Doctor</MenuItem></a>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}
