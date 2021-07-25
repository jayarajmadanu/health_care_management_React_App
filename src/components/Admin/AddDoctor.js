import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { BASE_URL, SPECIFICATIONS_URL, ADD_DOCTOR_URL } from '../constants/url';
import { Redirect } from 'react-router';

export default function AddDoctor(props) {

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });
    const [specification, setspecification] = useState('*');
    const [specifications, setspecifications] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + SPECIFICATIONS_URL)
        .then(res=>{
         setspecifications(res.data.specifications)
            console.log(specifications)
        }
        )
        .catch()
     }, []);

    const [userDetails, setuserDetails] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        email:'',
        password:'',
        specification:'',
        hospital:'',
        description:''

    });

    const handleChange = (e)=>{
        setuserDetails({...userDetails,[e.target.name]:e.target.value})
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post(BASE_URL+ADD_DOCTOR_URL,{
            userId: user.userId,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            gender:userDetails.gender,
            email:userDetails.email,
            password:userDetails.password,
            specification:userDetails.specification,
            hospital:userDetails.hospital,
            description:userDetails.description
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

            <div style={{width:'80%', margin:'auto'}}>
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
                        <Form.Control type="text"  value={userDetails.email} name='email' onChange={handleChange}  />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Gender</b></Form.Label>
                        <Form.Control type="text" value={userDetails.gender} name='gender' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control type="password" value={userDetails.password} name='password' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Hospital</b></Form.Label>
                        <Form.Control type="text" value={userDetails.hospital} name='hospital' onChange={handleChange} />
                    </Form.Group>


                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control type="text" value={userDetails.description} name='description' onChange={handleChange} />
                    </Form.Group>

                
                    <FormControl >
                    <InputLabel id="demo-mutiple-name-label">specifications</InputLabel>
                    <Select 
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        value={userDetails.specification}
                        onChange={handleChange} name='specification'>
                            <option value='*' >All</option>
                        {
                            specifications.map((s,key)=>{
                                return(
                                    <option value={key+1} key={key}>{s}</option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <br/>
                

                    <Button variant="primary" type="submit" style={{margin:'10px'}} >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
