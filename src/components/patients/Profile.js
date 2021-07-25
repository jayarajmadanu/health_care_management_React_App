import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { BASE_URL, GET_USER_BY_ID, UPDATE_USER_URL } from '../constants/url';
import { Redirect } from 'react-router';

export default function Profile(props) {

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const [userDetails, setuserDetails] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        email:'',
        password:''
    });

    const handleChange = (e)=>{
        setuserDetails({...userDetails,[e.target.name]:e.target.value})
    }

    useEffect(() => {
        axios.post(BASE_URL + GET_USER_BY_ID,{
            userId: user.userId
        })
        .then(res=>{
            setuserDetails({
                firstName: res.data.user.firstName,
                lastName: res.data.user.lastName,
                gender: res.data.user.gender,
                email:res.data.user.email,
                password:res.data.user.password
            })
        })
        .catch()
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(BASE_URL+UPDATE_USER_URL,{
            userId: user.userId,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            gender:userDetails.gender,
            email:userDetails.email,
            password:userDetails.password
        })
        .then(res=>props.history.goBack())
        .catch(err=>console.log(err))
    }


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
                            <MenuItem >Profile</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </div>
                </Container>
            </Navbar>

            <div>
            <Form style={{width:'80%', margin:'auto'}} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>First Name</b></Form.Label>
                        <Form.Control type="text" value={userDetails.firstName} name='firstName' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Last Name</b></Form.Label>
                        <Form.Control type="text" value={userDetails.lastName}  name='lastName' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>Email</b></Form.Label>
                        <Form.Control type="text"  value={userDetails.email} name='email' onChange={handleChange} disabled={true} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Gender</b></Form.Label>
                        <Form.Control type="text" value={userDetails.gender} name='gender' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control type="password" value={userDetails.password} name='password' onChange={handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{margin:'10px'}} >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
