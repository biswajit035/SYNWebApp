import React, { useEffect, useState } from 'react'
import './Login.css'
import  img1 from "../../Assests/LoginT.png"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { logDOM } from '@testing-library/react';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST

    let navigate = useNavigate();
    const [data, setData] = useState({
        "username": "",
        "password": ""
    });

    const chkToken = async () => {
        const token = Cookies.get("token");
        if (token) {
            const tokenResponse = await fetch(`${BACKEND_HOST}/auth/verification`, {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                    'token': token
                }
            });
            if (tokenResponse.status === 200) {
                navigate("/")
            }
        }
    }

    useEffect(() => {
        chkToken();
        console.log(BACKEND_HOST);
    }, []);

    const handleClick =  async(e) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch(`${BACKEND_HOST}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: data.username,
                    password: data.password
                }
            )
        });
        // console.log(response);
        const json =await response.json();
        if (response.status === 200 && json.token) {
            console.log(json.token);
            Cookies.set("token", json.token);
            navigate("/")
        }
        else {
            alert(json.msg)
        }
        setLoading(false)
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className='login-main' >
            
            <div className="login-left">
                <div className="login-img">
                    <img src={img1} alt="" className='loginimg' />
                </div>
            </div>
            <div className="login-right">
                <div className="right-content">
                    <div className="loginup-heading">Login</div>
                    <div className="form-main">
                        <form className='form-content' onSubmit={handleClick}>
                            <label htmlFor="username">Username <span className='redColor'>*</span></label>
                            <input type="email" id="username" name="username" className='input-field' onChange={onChange} placeholder='Enter Username' required />
                            <label htmlFor="Password">Password <span className='redColor'>*</span></label>
                            <input type="password" name="password" className='input-field' onChange={onChange} placeholder='Enter password' required />
                            <Link className='forget-pass' to="/reset">Forget Password</Link>
                            <button type='submit' className='btn-signup' onSubmit={handleClick}>
                                {
                                    loading ?
                                        "Loading.."
                                        :
                                        "Login"
                                }
                            </button>
                        {/* <button type="submit" value="Submit">Submit</button> */}
                        </form>
                    </div>
                </div>
                            <span >
                                Dont have an Account?
                                <Link to="/signup">Signup</Link>
                            </span>
            </div>
        </div>
    )
}

export default Login