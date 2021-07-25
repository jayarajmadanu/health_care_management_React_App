import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Navbar, Nav, Container,Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL, SPECIFICATIONS_URL, GET_DOCTORS_URL } from '../constants/url';


export default function AdminDashboard(props) {

    const [specification, setspecification] = useState('*');
    const [specifications, setspecifications] = useState([]);
    const [doctors, setdoctors] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + SPECIFICATIONS_URL)
        .then(res=>{
         setspecifications(res.data.specifications)
            console.log(specifications)
        }
        )
        .catch()
     }, []);
     useEffect(() => {
        axios.post(BASE_URL + GET_DOCTORS_URL,{
            specification:specification
        })
        .then(res=>{
            setdoctors(res.data.doctors)
            console.log(res.data.doctors)
        })
        .catch(err=>{

        })
        
    }, [specification])

    return (
        <div>
            <Navigation />
            <div>
            <div style={{display:'flex',margin:'auto'}}>
                <span style={{margin:'2%'}}><i>Search Doctors by Specification</i></span>
                <FormControl style={{float:'left', marginLeft:'5%', marginTop:'1%'}}>
                    <InputLabel id="demo-mutiple-name-label">specifications</InputLabel>
                    <Select 
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        value={specification}
                        onChange={(e)=>setspecification(e.target.value)}>
                            <option value='*' >All</option>
                        {
                            specifications.map((s,key)=>{
                                return(
                                    <option value={s} key={key}>{s}</option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            
            <div style={{marginTop:'10px'}}>
                {
                    doctors.map((doc,key)=>{
                        return(
                        <Card key={key} style={{width:'80%', height:'20%', margin:'auto',marginTop:'10px',boxShadow: '10px 10px 5px grey'}}>
                            <Card.Header style={{backgroundColor:'#00284d', color:'white'}}>{doc.firstName+" "+doc.lastName}</Card.Header>
                            <Card.Body>
                                <Card.Title>{doc.specification}</Card.Title>
                                <Card.Text>
                                <p>{doc.description}</p>
                                <p>Gender  :   {doc.gender}</p>
                                <p>Email  :   {doc.email}</p>
                                <p>Hospital  :   {doc.hospital}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    })
                }
                
            </div>

            </div>
        </div>
    )
}
