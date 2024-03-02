import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css'
import { FaUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import Dropdown from '../Dropdown/DropDown';
import Loader from '../Loader';


const Dashboard = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchData = async (token) => {
        const tokenResponse = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/verification`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'token': token
            }
        });
        if (tokenResponse.status === 200) {

            const tokenJson = await tokenResponse.json();
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookies.get("token")
                }
            });
            const json = await response.json();
            setData(json.data);
            setLoading(false)
        }
        else {
            navigate("/login")
        }
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);
    }, []);



    return (

        <div className='dashboard-main'>
            <div className="dash-header">
                <div className="dashitems">
                    User Dashboard
                </div>
                
                <Dropdown />
            </div>
            <div className="dash-body">
            {
                loading ?
                    <Loader/>
                    :
                    <div className="dash-main-body">
                            {/* <h1 className='dash-heading'>My Profile</h1> */}
                            <div className="row1">
                                <div className="item-name">First Name:</div>
                                <div className="item-content">{data.first_name}</div>
                            </div>
                            <div className="row1">
                                <div className="item-name">Last Name:</div>
                                <div className="item-content">{data.last_name}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Email:</div>
                                <div className="item-content">{data.email}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Ph-no:</div>
                                <div className="item-content">{data.phone}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Address:</div>
                                <div className="item-content">{data.address}</div>
                            </div>
                        </div>
            }
                    </div>
        </div>
    )
}

export default Dashboard