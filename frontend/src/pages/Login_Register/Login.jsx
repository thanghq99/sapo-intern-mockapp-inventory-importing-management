import React from 'react';
import "./login.scss";


export default function Login() {
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
                        <h2 className="title">Đăng nhập</h2>
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
                                <i className="fas fa-lock" />
                            </div>
                            <div className="div">
                                <input type="password" placeholder='Mật khẩu' className="input" />
                            </div>
                        </div>
                        <a href="#">Quên mật khẩu?</a>
                       <div className="submit">
                        <button>Đăng nhập</button>
                        <button>Đăng ký</button>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
