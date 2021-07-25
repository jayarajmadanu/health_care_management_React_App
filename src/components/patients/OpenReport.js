import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL , GET_REPORT_URL} from '../constants/url';
import Navigation from '../Navigation';

export default function OpenReport(props) {
    const param = new URLSearchParams(props.location.search);
    const bookingId = param.get('bookingId');
    const [report, setreport] = useState('')
    useEffect(() => {
        axios.post(BASE_URL+GET_REPORT_URL,{
            bookingId:bookingId
        })
        .then(res=>setreport(res.data.report))
        .catch(err=>console.log(err));
    }, [])
    return (
        <div>
            <Navigation />
            <div>
                <h1>Your Report</h1>
                <p>
                    {
                        report
                    }
                </p>
            </div>
        </div>
    )
}
