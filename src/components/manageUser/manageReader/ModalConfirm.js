
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteReader } from "../../../service/userService";
import { toast } from "react-toastify";

function ModalConfirm(props) {

    const { show, handleClose, dataUser } = props



    const confirmDelete = async () => {

        let resDelete = await deleteReader(dataUser);
        console.log('res data :', resDelete)
        if (resDelete && resDelete.data && resDelete.data.EC === 0) {
            window.location.reload()
            toast.success(resDelete.data.EM)
            handleClose()
        }
        else {
            toast.error(resDelete.data.EM)
            handleClose()
        }

    }
    return (
        <>
            <Modal show={show} onClick={handleClose} centered>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title> Xác nhận xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có thực sự muốn xóa người dùng này không ?
                    <br></br>
                    <b>Email</b> : <b>{dataUser.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
