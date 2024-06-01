import React, { useEffect, useState } from 'react'
import "./tableBook.scss";
import { fetchAllBook } from '../../service/userService';
import ModalConfirm from './ModalConfirm';
const TableBook = (props) => {
    const [listBook, setListBook] = useState([]);
    const [dataUser, setDataUser] = useState({})
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)
    const { handleEditUserFromParent } = props;
    useEffect(() => {
        getAllBook()

    }, [])
    const getAllBook = async () => {
        const res = await fetchAllBook()

        if (res && res.data.EC === 0) {
            setListBook(res.data.DT);

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

                            <span>ID</span>


                        </th>
                        <th>

                            <span>Tên</span>

                        </th>
                        <th>

                            <span>Tác giả</span>


                        </th>
                        <th>

                            <span>Thể loại</span>


                        </th>


                        <th>Năm xuất bản</th>
                        <th>
                            Số lượng
                        </th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listBook &&
                        listBook.length > 0 &&
                        listBook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="stt-user">{index + 1}</td>
                                    <td className="id">{item.id}</td>
                                    <td className="name">{item.name}</td>
                                    <td className="username">{item.author}</td>
                                    <td className="email">{item.genre}</td>
                                    <td className="gender">{item.publicYear}</td>
                                    <td className="phone">
                                        {item.quantity}
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

export default TableBook
