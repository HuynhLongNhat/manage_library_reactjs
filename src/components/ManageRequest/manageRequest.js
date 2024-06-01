import React, { useEffect, useState } from 'react'

import TableBook from './tableRequest';
import ModalHandleRequest from './ModalHandleRequest';
const ManageRequest = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [action, setAction] = useState('CREATE');
    const [dataEditUser, setDataUser] = useState({})



    const toggleShowModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const handleEditUserFromParent = (user) => {
        setIsOpenModal(!isOpenModal)
        setAction("UPDATE")

        setDataUser(user)

    }

    return (
        <div>
            <div className="manage-product-container container">
                <div className=" mt-5 ms-title"><h3>Quản lí yêu cầu mượn sách</h3> </div>
                <div className="btn btn-primary my-5 mx-3 "
                    onClick={() => {
                        toggleShowModal();
                        setAction("CREATE")
                    }} > <i className="fa-solid fa-circle-plus mx-2"></i> Tạo yêu cầu mượn sách
                </div>

                <div className="mb-5">
                    <ModalHandleRequest
                        show={isOpenModal}
                        toggleShowModal={toggleShowModal}
                        action={action}
                        dataEditUser={dataEditUser}
                    />
                    <TableBook
                        handleEditUserFromParent={handleEditUserFromParent}
                    />
                </div>
            </div >

        </div>
    )
}

export default ManageRequest
