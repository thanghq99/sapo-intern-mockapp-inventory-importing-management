import React from 'react';
import "./login.scss";
import { useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contextAPI/AuthContext';
import Login_RegisterAPI from '../../api/Login_RegisterAPI';

export default function Login() {

    const username = useRef("");
    const password = useRef("");
    const { dispatch } = useContext(AuthContext);

    const LoginCall = async (e) => {
        e.preventDefault();
        const inputlogin = {
            username: username.current.value,
            password: password.current.value
        }
        console.log(inputlogin);
        try {
            const res = await Login_RegisterAPI.logincall(inputlogin);
            console.log(res.data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error });
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
                                <input required ref={username} type="text" placeholder='Tên người dùng' className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <input required ref={password} type="password" placeholder='Mật khẩu' className="input" />
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
        </div>
    )
}
