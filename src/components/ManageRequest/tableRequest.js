import React, { useEffect, useState } from 'react'
import "./tableRequest.scss";
import { getAllRequest } from '../../service/userService';
import ModalConfirm from './ModalConfirm';
const TableBook = (props) => {
    const [listRequest, setListRequest] = useState([]);
    const [dataUser, setDataUser] = useState({})
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)

    useEffect(() => {
        fetchAllRequest()

    }, [])
    const fetchAllRequest = async () => {
        const res = await getAllRequest()
        console.log("res : ", res.data.DT)
        if (res && res.data.EC === 0) {
            setListRequest(res.data.DT);

        }
    }




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

                            <span>Tên sách </span>


                        </th>
                        <th>

                            <span>Số lượng</span>

                        </th>
                        <th>

                            <span>Ngày mượn</span>


                        </th>
                        <th>

                            <span>Hạn trả</span>


                        </th>


                        <th>Người mượn</th>
                        <th>Duyệt bởi</th>


                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRequest &&
                        listRequest.length > 0 &&
                        listRequest.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt-user">{index + 1}</td>


                                    <td className="name">{item.bookData.name}</td>
                                    <td className="username">{item.quantity}</td>
                                    <td>
                                        Ngày mượn
                                    </td>
                                    <td>
                                        Hạn trả
                                    </td>
                                    <td>
                                        {item.readerId}
                                    </td>
                                    <td>
                                        Duyệt bởi
                                    </td>

                                    <td>

                                        <button
                                            className=" btn btn-primary"
                                            onClick={() => handleDeleteUser(item)}

                                        >
                                            <i className="fa-solid fa-arrow-left mx-2"></i>
                                            Trả sách
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

export default TableBook
