/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalHandleBook.scss"
import { createRequest, updateBook } from "../../service/userService";
import { fetchAllReader, fetchAllBook } from "../../service/userService";
function ModalHandleBook(props) {


    const { action, show, dataEditUser, toggleShowModal } = props;


    const [listCode, setListCode] = useState('');
    const [selectedCode, setSelectedCode] = useState('')

    const [listBook, setListBook] = useState('')
    const [selectedBook, setSelectedBook] = useState('')
    const [quantity, setQuantity] = useState('')


    useEffect(() => {
        if (action === "UPDATE") {


            // setNameBook(dataEditUser.genre);
            setQuantity(dataEditUser.publicYear);


        }
    }, [dataEditUser])
    useEffect(() => {
        if (action === "CREATE") {
            // setCode('')


            setQuantity('')



        }
    }, [action])
    useEffect(() => {
        getAllReader()
        getAllBook()

    }, [])
    const getAllReader = async () => {
        const res = await fetchAllReader()

        if (res && res.data.EC === 0) {
            setListCode(res.data.DT);

        }
    }

    const getAllBook = async () => {
        const res = await fetchAllBook()

        if (res && res.data.EC === 0) {
            setListBook(res.data.DT);

        }
    }




    const handleConfirmBook = async () => {


        let res = await (createRequest({
            readerId: selectedCode,
            bookId: selectedBook,
            quantity: quantity


        }))
        console.log('res :', res)

        if (res && res.data && res.data.EC === 0) {

            toast.success(res.data.EM)
            toggleShowModal()


            setQuantity('')




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
                        {action === "CREATE" ? "Tạo yêu cầu mượn sách" : "Chỉnh sửa thông tin"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Mã sinh viên  <span className="text-danger">(*)</span>
                            </label>
                            <select className="form-control" value={selectedCode}
                                onChange={(event) => setSelectedCode(event.target.value)}
                            >
                                <option value="">Chọn mã sinh viên...</option>
                                {listCode &&
                                    listCode.length > 0 &&
                                    listCode.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>
                                                {item.code} - {item.name}
                                            </option>
                                        );
                                    })}

                            </select>

                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Tên sách<span className="text-danger">(*)</span>
                            </label>
                            <select className="form-control" value={selectedBook}
                                onChange={(event) => setSelectedBook(event.target.value)}
                            >
                                <option value="">Chọn tên sách...</option>
                                {listBook &&
                                    listBook.length > 0 &&
                                    listBook.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}

                            </select>
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Số lượng<span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="number"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                            ></input>
                        </div>





                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleShowModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmBook()}>
                        {action === "CREATE" ? "Thêm" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalHandleBook;
