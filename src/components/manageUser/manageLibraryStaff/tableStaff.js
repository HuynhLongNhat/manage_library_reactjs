import React, { useEffect, useState } from 'react'
import "./tableStaff.scss";
import { fetchAllStaff } from '../../../service/userService';
import ModalConfirm from './ModalConfirm';
const TableStaff = (props) => {


    const [listStaff, setListStaff] = useState([]);
    const [dataUser, setDataUser] = useState({})
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)
    const { handleEditUserFromParent } = props;
    useEffect(() => {
        getAllStaff()

    }, [])
    const getAllStaff = async () => {
        const res = await fetchAllStaff()

        if (res && res.data.EC === 0) {
            setListStaff(res.data.DT);

        }
    }


    const handleEditUser = (user) => {
        handleEditUserFromParent(user)
    };

    const toggleShowModalConfirm = () => {
        setShowModalConfirm(!isShowModalConfirm)
    }
    const handleDeleteUser = (user) => {
        toggleShowModalConfirm()
        setDataUser(user)
        console.log("user", user)

    };
    return (
        <div className="container">
            <div className='col-12 col-sm-4 my-3'>

            </div>
            <table id="TableUser">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>

                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Tên người dùng</span>

                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Tên đăng nhập</span>

                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Email</span>

                            </div>
                        </th>


                        <th>Giới tính</th>
                        <th>
                            <div className='sort-header'>
                                <span>Số điện thoại</span>

                            </div>
                        </th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listStaff &&
                        listStaff.length > 0 &&
                        listStaff.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt-user">{index + 1}</td>
                                    <td className="id">{item.id}</td>
                                    <td className="name">{item.name}</td>
                                    <td className="username">{item.username}</td>
                                    <td className="email">{item.email}</td>
                                    <td className="gender">{item.gender}</td>
                                    <td className="phone">
                                        {item.phone}
                                    </td >

                                    <td>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => handleEditUser(item)}
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className=" btn btn-danger"
                                            onClick={() => handleDeleteUser(item)}

                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={toggleShowModalConfirm}
                dataUser={dataUser}
            />

        </div>
    )
}

export default TableStaff
