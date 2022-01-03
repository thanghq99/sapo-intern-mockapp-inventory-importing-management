import React from 'react'
import "./register.scss";
import { Link } from "react-router-dom";

export default function Register() {
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
                    <form action="">
                        <h2 className="title">Đăng ký</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user" />
                            </div>
                            <div className="div">
                                <input type="text" placeholder='Tên người dùng' className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <input type="email" placeholder='Email' className="input" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <input type="password" placeholder='Mật khẩu' className="input" />
                            </div>
                        </div>
                        <div className="submit">
                            <button>Xác nhận</button>
                            <Link to={"/login"} className='back_to_login'>
                                Bạn đã có tài khoản
                            </Link>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
