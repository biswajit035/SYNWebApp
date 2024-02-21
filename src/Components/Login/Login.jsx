import React, { useEffect, useState } from 'react'
import '../Login/Login.css'
import img1 from '../../Assests/Login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


const Login = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        "username":"",
        "password":""
    });

    const chkToken=()=>{
        const token = Cookies.get("token");
        if(token) navigate("/")
    }

    useEffect(() => {
        chkToken();
    }, []);

    const handleClick=async()=>{
        const response = await fetch(`https://creepy-blue-trout.cyclic.app/auth/signin`, {
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
        console.log(response);
        const json = await response.json();
        console.log(json);
        if(response.status === 200 && json.token) 
        {
            Cookies.set("token",json.token);
            navigate("/")
        }
    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }
    return (
        <div className='login-main' >
            <div className="login-left">
                <div className="left-content">
                    <div className="loginup-heading">Login</div>
                    <div className="form-main">
                        <form action="" className='form-content'>
                            <label htmlFor="">Username</label>
                            <input type="text" name="username" className='input-field' onChange={onChange} placeholder='Enter Username' required />
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="password" className='input-field' onChange={onChange} placeholder='Enter password' required />
                            <Link className='forget-pass' to="/reset">Forget Password</Link>
                            <div className='btn-signup' onClick={handleClick}>Login</div>
                            <span>
                                Dont have an Account? 
                                <Link to="/signup">Signup</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            <div className="login-right">
            <div className="login-img">
                    <img src={img1} alt="" className='loginimg' />
                </div>
            </div>
        </div>
    )
}

export default Login