/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalHandleBook.scss"
import { createBook, updateBook } from "../../service/userService";
function ModalHandleBook(props) {


    const { action, show, dataEditUser, toggleShowModal } = props;


    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [publicYear, setPublicYear] = useState('')
    const [quantity, setQuantity] = useState('')

    useEffect(() => {
        if (action === "UPDATE") {
            setName(dataEditUser.name)
            setAuthor(dataEditUser.author)
            setGenre(dataEditUser.genre);
            setPublicYear(dataEditUser.publicYear);
            setQuantity(dataEditUser.quantity);

        }
    }, [dataEditUser])
    useEffect(() => {
        if (action === "CREATE") {
            setName('')
            setAuthor('')
            setGenre('');
            setPublicYear('');
            setQuantity('');



        }
    }, [action])

    const handleConfirmBook = async () => {
        let res = action === "CREATE" ? await (createBook({
            name: name,
            author: author,
            genre: genre,
            publicYear: publicYear,
            quantity: quantity,



        }))
            : await updateBook({
                id: dataEditUser.id,
                name: name,
                author: author,
                genre: genre,
                publicYear: publicYear,
                quantity: quantity,

            })

        if (res && res.data && res.data.EC === 0) {

            toast.success(res.data.EM)
            toggleShowModal()
            setName('')
            setAuthor('')
            setGenre('');
            setPublicYear('');
            setQuantity('');



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
                        {action === "CREATE" ? "Thêm sách mới" : "Chỉnh sửa thông tin"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Tên sách  <span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="email"
                                value={name}
                                onChange={(event) => setName(event.target.value)

                                }
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Tác giả<span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="text"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Thể loại<span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="text"
                                value={genre}
                                onChange={(event) => setGenre(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Năm xuất bản<span className="text-danger">(*)</span>
                            </label>
                            <input

                                className={
                                    "form-control"
                                }
                                type="number"
                                value={publicYear}
                                onChange={(event) => setPublicYear(event.target.value)}
                            ></input>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Số lượng</label>
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
