import React, { useState } from 'react'
import '../ForgetPassword/ForgetPassword.css'
import img1 from '../../Assests/forgetPass.jpg'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        "email": ""
    });
    let navigate = useNavigate();


    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        console.log(data.email);

        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: data.email
                }
            )
        });
        // console.log(response);
        const json = await response.json();
        alert("Password sent to your registered email");
        navigate("/login")
        setLoading(false)
    }

    return (
        <div className='forgetpass-main'>
            <div className="forgetpass">
                <div className="forget-heading">Forget Password</div>
                <div className="form-main-forget">
                    <form className='form-content' onSubmit={handleClick}>
                        {/* <label htmlFor="">Email</label> */}
                        <input type="text" name="email" className='input-field' placeholder='Enter Your Email' onChange={onChange} required />
                        <button className='btn-signup'>
                            {
                                loading?"Loading...":"Sent Password"
                            }
                            </button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ForgetPassword