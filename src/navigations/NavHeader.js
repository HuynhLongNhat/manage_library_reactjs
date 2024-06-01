import "./NavHeader.scss"
import React, { useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import logo from "../asset/logo_xanhdecor.png"
import Cart_product from "../components/Home/Cart_product/Cart_product";
const NavHeader = () => {
    const [closeHideCart, setCloseHideCart] = useState(false);
    const handleShowHideCart = () => {
        setCloseHideCart(!closeHideCart)
    }
    return (
        <div className="nav-header-container">
            <div className="nav-header">
                <Navbar bg="header">
                    <Container>
                        <Navbar.Brand href="#" className="navbar-brand">
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <NavLink to="/" className="nav-link"><i className="fa fa-home px-1"></i>Trang chủ</NavLink>
                                <NavLink to="/news" className="nav-link"><i className="fa fa-newspaper-o px-1"></i>Tin tức</NavLink>
                                <NavLink to="/introduce" className="nav-link"><i className="fa fa-info-circle px-1"></i>Giới thiệu</NavLink>
                                <NavLink to="/product" className="nav-link">Sản phẩm</NavLink>

                            </Nav>

                            <Nav>

                                <>
                                    <Nav.Item className="nav-link">Chào mừng Long Nhat</Nav.Item>
                                    <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Thông tin cá nhân</NavDropdown.Item>
                                        <NavDropdown.Item >Đổi mật khẩu</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item><span>Đăng xuất</span></NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="home-container">
                <div className="container">
                    <div className="row">
                        <div className="row product-header mt-3">
                            <div className="col-2 header-cart">
                                <img
                                    src={logo}
                                    width="200"
                                    height="100"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </div>
                            <div className="col-9 product-search">

                                <input className="form-control input-search " placeholder="Bạn muốn tìm loại cây gì?"></input>
                                <button className='btn btn-success btn-search mx-1'><i className="fa fa-search"> Tìm kiếm</i></button>
                            </div>
                            <div className='col-1 product-cart' onClick={() => handleShowHideCart()}>
                                <Cart_product closeHideCart={closeHideCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default NavHeader;