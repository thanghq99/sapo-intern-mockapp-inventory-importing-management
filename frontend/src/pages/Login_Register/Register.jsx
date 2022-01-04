import React, { useRef, useState } from 'react'
import "./register.scss";
import { Link, useHistory } from "react-router-dom";
import Login_RegisterAPI from '../../api/Login_RegisterAPI';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';


export default function Register() {
    const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });


    const username = useRef();
    const password = useRef();
    const email = useRef();
    const history = useHistory();

    const RegisterHandle = async (e) => {
        e.preventDefault();
        const newAdmin = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        }
        if (username.current.value == "" || password.current.value == "" || email.current.value == "") {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: "Yêu cầu điền tên đăng ký, email và mật khẩu" })
        } else {
            try {
                await axios.post("http://localhost:9191/register", newAdmin);
                history.push("/login");
            } catch (error) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Người dùng hoặc email này đã tồn tại" })
            }
        }
    }

    return (
        <div className="login">
            <div className="background">
                <img className='logo_image' src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/home/bg-banner-mobile.png?v=5" alt="" />
            </div>
            <div className="container">
                <div className="img">
                    <img className='logo_image' src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg" alt="" />
                </div>
                <div className="login-content">
                    <form onSubmit={RegisterHandle}>
                        <h2 className="title">Đăng ký</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user" />
                            </div>
                            <div className="div">
                                <input ref={username} type="text" placeholder='Tên người dùng' className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <input ref={email} type="email" placeholder='Email' className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <input ref={password} type="password" placeholder='Mật khẩu' className="input" />
                            </div>
                        </div>
                        <div className="submit">
                            <button type='submit'>Xác nhận</button>
                            <Link to={"/login"} className='back_to_login'>
                                Bạn đã có tài khoản
                            </Link>
                        </div>
                    </form>
                </div>
            </div >
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={stateAlert.open}
                autoHideDuration={2000}
                onClose={() => setStateAlert({ ...stateAlert, open: false })}
            >
                <Alert
                    onClose={() => setStateAlert({ ...stateAlert, open: false })}
                    severity={stateAlert.severity}
                    variant={stateAlert.variant}
                    sx={{ width: '100%' }}
                >
                    {stateAlert.content}
                </Alert>
            </Snackbar>
        </div >
    )
}
