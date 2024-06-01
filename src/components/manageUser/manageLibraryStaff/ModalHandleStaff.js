/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalHandleStaff.scss"

import _ from "lodash";

import { createStaff, updateStaff } from "../../../service/userService";
function ModalHandleUser(props) {



    const { action, show, dataEditUser, toggleShowModal } = props;
    const listGender = ['Nam', 'Nữ', "Khác"];

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState(listGender[0])

    const [isShowPassword, setIsShowPassword] = useState(false)

    const defaultValidInput = {
        email: true,
        phone: true,
        name: true,
        username: true,
        password: true,
        address: true,
        gender: true,

    }
    const [checkValid, setCheckValid] = useState(defaultValidInput)


    useEffect(() => {
        if (action === "UPDATE") {
            setName(dataEditUser.name)
            setEmail(dataEditUser.email)
            setPhone(dataEditUser.phone);
            setUsername(dataEditUser.username);
            setAddress(dataEditUser.address);
            setGender(dataEditUser.gender);



        }
    }, [dataEditUser])
    useEffect(() => {
        if (action === "CREATE") {
            setEmail(null);
            setName(null);
            setPhone(null);
            setPassword(null)
            setUsername(null)
            setAddress(null);
            setGender(listGender[0]);


        }
    }, [action])

    const checkInvalidInput = () => {
        setCheckValid(defaultValidInput)
        if (!email) {
            toast.error('Vui lòng nhập email!');
            setCheckValid({ ...defaultValidInput, email: false })
            return false;
        }
        if (!phone) {
            toast.error('Vui lòng nhập số điện thoại!');
            setCheckValid({ ...defaultValidInput, phone: false })
            return false;
        }
        if (!name) {
            toast.error('Vui lòng nhập họ tên!');
            setCheckValid({ ...defaultValidInput, name: false });
            return false;
        }
        if (!username) {
            toast.error('Vui lòng nhập tên đăng nhập!');
            setCheckValid({ ...defaultValidInput, username: false });
            return false;
        }
        if (action !== "UPDATE" && !password) {
            toast.error('Vui lòng nhập mật khẩu!');
            setCheckValid({ ...defaultValidInput, password: false });
            return false;
        }
        if (!address) {
            toast.error('Vui lòng nhập địa chỉ!');
            setCheckValid({ ...defaultValidInput, address: false });
            return false;
        }
        if (!gender) {
            toast.error('Vui lòng chọn giới tính!');
            setCheckValid({ ...defaultValidInput, gender: false });
            return false;
        }

        return true;
    }
    const handleConfirmUser = async () => {

        let check = checkInvalidInput();
        if (check === true) {
            let res = action === "CREATE" ? await (createStaff({
                email: email,
                phone: phone,
                name: name,
                username: username,
                password: password,
                address: address,
                gender: gender,


            }))
                : await updateStaff({
                    id: dataEditUser.id,
                    email: email,
                    phone: phone,
                    name: name,
                    username: username,
                    password: password,
                    address: address,
                    gender: gender,

                })

            if (res && res.data && res.data.EC === 0) {

                toast.success(res.data.EM)
                toggleShowModal()
                setName('')
                setEmail(" ");
                setPhone(" ");
                setPassword('')
                setUsername(" ")
                setAddress(" ");
                setGender(listGender[0]);
                // window.location.reload()

            }
            else {

                toast.error(res.data.EM)
            }
        }
    }


    return (
        <div>
            <Modal size="lg" show={show} className="modal-user">
                <Modal.Header closeButton onHide={toggleShowModal}>
                    <Modal.Title>
                        {action === "CREATE" ? "Thêm người dùng mới" : "Chỉnh sửa thông tin"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Email  <span className="text-danger">(*)</span>
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    checkValid.email ? "form-control" : "form-control is-invalid"
                                }
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)

                                }
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Số điện thoại <span className="text-danger">(*)</span>
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    checkValid.phone ? "form-control" : "form-control is-invalid"
                                }
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Họ và tên <span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    checkValid.name ? "form-control" : "form-control is-invalid"
                                }
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Tên đăng nhập</label>
                            <input
                                className={
                                    checkValid.username
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group input-password">
                            {action === "CREATE" && (
                                <>
                                    <label>
                                        Mật khẩu <span className="text-danger">(*)</span>
                                    </label>
                                    <input
                                        className={
                                            checkValid.password
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        type={isShowPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    ></input>
                                    <i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </>
                            )}
                        </div>
                        <div className="col-12 col-sm-12  form-group">
                            <label>Địa chỉ</label>
                            <input
                                className={
                                    checkValid.address
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Giới tính</label>
                            <select
                                className={
                                    checkValid.gender ? "form-select" : "form-select is-invalid"
                                }
                                onChange={(event) => setGender(event.target.value)}
                                value={gender}
                            >
                                {listGender &&
                                    listGender.length > 0 &&
                                    listGender.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShowModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Thêm" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalHandleUser;
