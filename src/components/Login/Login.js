import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { loginUser } from "../../service/userService";

import "./Login.scss"
const Login = () => {

    const [isShowPassword, setIsShowPassword] = useState(false)

    let navigate = useNavigate()
    const navigateRegister = () => {
        navigate('/register')
    }
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPassWord: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    const checkInvalidInput = () => {
        setObjCheckInput(defaultValidInput);
        if (!valueLogin) {
            toast.error("Vui lòng nhập email hoặc số điện thoại!");

            setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false });
            return false;
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        return true;
    };


    const handleLogin = async () => {
        let check = checkInvalidInput();
        if (check === true) {
            let res = await loginUser({
                valueLogin,
                password
            })
            if (res.data.EC === 0) {
                toast.success(res.data.EM);
                navigate('/')
            }
            else {
                toast.error(res.data.EM)
            }
        }

    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }
    return (<>
        <div className="login-container ">
            <div className="container">
                <div className="row  px-3 px-sm-0">
                    <div className="content-left d-none col-sm-7 d-sm-block">
                        {/* <div className="brand">Long Nhat</div>
                        <div className="detail">Fullstack web developer....</div> */}
                    </div>

                    <div className="content-right col-12 col-sm-5  d-flex flex-column gap-3 py-3 ">
                        <div className="brand  d-block d-sm-none ">Long Nhat</div>
                        <div className="form-group">
                            <label className="">Email hoặc số điện thoại <span className="text-danger">(*)</span></label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidValueLogin ? "form-control" : "form-control is-invalid"
                                }
                                value={valueLogin}
                                onChange={(event) => setValueLogin(event.target.value)}
                            />
                        </div>
                        <div className="form-group input-password">
                            <label className="">Mật khẩu<span className="text-danger">(*)</span></label>
                            <input

                                type={isShowPassword ? "text" : "password"}
                                className={
                                    objCheckInput.isValidPassWord ? "form-control" : "form-control is-invalid"
                                }

                                value={password}
                                onChange={(event) => setPassword(event.target.value)}

                            />
                            <i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleLogin()}
                            onKeyDown={(event) => handlePressEnter(event)}
                        >

                            Đăng nhập
                        </button>
                        <span className="text-center ">
                            <a className="forgot-password" href="#">
                                Quên mật khẩu
                            </a>
                        </span>
                        <hr></hr>
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => navigateRegister()}
                            >
                                Bạn chưa có tài khoản ? Đăng ký ngay!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Login;