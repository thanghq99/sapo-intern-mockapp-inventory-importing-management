import React, { useState } from 'react';
import "./login.scss";
import { useContext, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../contextAPI/AuthContext';
import Login_RegisterAPI from '../../api/Login_RegisterAPI';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export default function Login() {

    const [stateAlert, setStateAlert] = useState({ severity: "", variant: "", open: false, content: "" });

    const username = useRef("");
    const password = useRef("");
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const LoginCall = async (e) => {
        e.preventDefault();
        const inputlogin = {
            username: username.current.value,
            password: password.current.value
        }
        if (username.current.value == "" || password.current.value == "") {
            setStateAlert({ severity: "error", variant: "standard", open: true, content: "Yêu cầu điền tên đăng nhập và mật khẩu" })
        } else {
            try {
                const res = await axios.post("http://localhost:9191/login", inputlogin);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                window.location.replace("/san-pham");
                // history.push("/san-pham")
            } catch (error) {
                setStateAlert({ severity: "error", variant: "filled", open: true, content: "Tên đăng nhập hoặc mật khẩu không đúng" })
                dispatch({ type: "LOGIN_FAILURE", payload: error });
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
                    <form onSubmit={LoginCall}>
                        <h2 className="title">Đăng nhập</h2>
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
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <input ref={password} type="password" placeholder='Mật khẩu' className="input" />
                            </div>
                        </div>
                        <a href="#">Quên mật khẩu?</a>
                        <div className="submit">
                            <button type='submit'>Đăng nhập</button>
                            <Link className='toRegister' to={"/register"}>
                                <button>Đăng ký</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
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
        </div>
    )
}
