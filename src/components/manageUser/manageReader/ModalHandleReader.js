/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalHandleReader.scss"

import _ from "lodash";

import { createReader, updateReader } from "../../../service/userService";
function ModalHandleUser(props) {



    const { action, show, dataEditUser, toggleShowModal } = props;
    const listGender = ['Nam', 'Nữ', "Khác"];

    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    const [address, setAddress] = useState('')
    const [gender, setGender] = useState(listGender[0])







    useEffect(() => {
        if (action === "UPDATE") {
            setName(dataEditUser.name)
            setEmail(dataEditUser.email)
            setPhone(dataEditUser.phone);
            setCode(dataEditUser.code)
            setAddress(dataEditUser.address);
            setGender(dataEditUser.gender);



        }
    }, [dataEditUser])
    useEffect(() => {
        if (action === "CREATE") {
            setEmail(null);
            setName(null);
            setPhone(null);
            setCode(null)
            setAddress(null);
            setGender(listGender[0]);


        }
    }, [action])


    const handleConfirmUser = async () => {



        let res = action === "CREATE" ? await (createReader({
            code: code,
            email: email,
            phone: phone,
            name: name,

            address: address,
            gender: gender,


        }))
            : await updateReader({
                id: dataEditUser.id,
                code: code,
                email: email,
                phone: phone,
                name: name,

                address: address,
                gender: gender,

            })

        if (res && res.data && res.data.EC === 0) {

            toast.success(res.data.EM)
            toggleShowModal()
            setName('')
            setEmail(" ");
            setPhone(" ");
            setCode('')
            setAddress(" ");
            setGender(listGender[0]);
            window.location.reload()

        }
        else {

            toast.error(res.data.EM)
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
                                Mã sinh viên<span className="text-danger">(*)</span>
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    "form-control"
                                }
                                type="text"
                                value={code}
                                onChange={(event) => setCode(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Họ và tên <span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Email  <span className="text-danger">(*)</span>
                            </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={
                                    "form-control"
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
                                    "form-control"
                                }
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            ></input>
                        </div>



                        <div className="col-12 col-sm-12  form-group">
                            <label>Địa chỉ</label>
                            <input
                                className={

                                    "form-control"

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
                                    "form-select"
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
