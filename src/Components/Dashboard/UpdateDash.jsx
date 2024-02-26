import React, { useEffect, useState } from 'react'
import '../Dashboard/Updatedash.css'
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dropdown from '../Dropdown/DropDown';



const UpdateDash = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [uloading, setUloading] = useState(false);



    const fetchData = async (token) => {
        setLoading(true)

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
        }
        else {
            navigate("/login")
        }
        setLoading(false)

    }



    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUloading(true)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/user/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': Cookies.get("token")
            },
            body: JSON.stringify(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                }
            )
        });
        // console.log(data);
        const json = await response.json();
        if (response.status == 200) navigate("/")
        setUloading(false)
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);

    }, []);


    return (
        <div className='update-dash'>

            <div className="dash-header">
                <div className="dashitems">
                    User Dashboard
                </div>
                <Dropdown />
            </div>
            {
                loading ?
                    "loading"
                    :
                    <>
                        <div className="update-dash-content">
                            <h1 className='dash-heading'>Update User's Details</h1>
                            <form className='form-body' onSubmit={handleUpdate}>
                                <label htmlFor="">First Name</label>
                                <input value={data.first_name} onChange={onChange} type="text" name='first_name' className='input-field' placeholder='Enter your First Name' required />
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="last_name" value={data.last_name} onChange={onChange} className='input-field' placeholder='Enter your Last Name' required />

                                <label htmlFor="">Email</label>
                                <input type="email" name="email" value={data.email} className='input-field' onChange={onChange} placeholder='Enter Your Email' required />

                                <label htmlFor="phone">Ph-No</label>
                                <input type="tel" name="phone" value={data.phone} onChange={onChange} className='input-field' placeholder='Enter your Ph-no' required pattern="[0-9]{10}" title="Enter exactly 10 digits"/>
                                <label htmlFor="">Address</label>
                                <textarea className='input-field' name='address' value={data.address} onChange={onChange} required />
                                <button className="button-update">
                                    {
                                        uloading ?
                                            "Loading ..."
                                            :
                                            "Update"
                                    }
                                </button>
                            </form>
                        </div>
                    </>
            }
        </div>
    )
}

export default UpdateDash