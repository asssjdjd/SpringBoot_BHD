import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from "../assets/react.svg";
import LoginButton from "./Login-Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { styled } from "@mui/material";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handeNavigate = () => {
      navigate('/home')
  }
  
  return (
    <div id="navbar-header" className="sticky-top">
      <Navbar expand="lg" bg="light" className="fw-bold">
        <Container>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />

          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0 ps-5">
              <Nav.Item>
                <Container>
                  <img src={logo} alt="logo_navbar" height="35" width="160" onClick={handeNavigate}/>
                </Container>
              </Nav.Item>

              <NavDropdown title="NOW SHOWING" id="now-showing-dropdown">
                <NavDropdown.Item  onClick={() => {navigate('/lich-chieu')}}>LỊCH CHIẾU PHIM</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {navigate('/theater')}}>LỊCH CHIẾU RẠP</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => {navigate('/cua-hang')}}>ĐỒ ĂN/COMBO</Nav.Link>

              <Nav.Link  onClick={() => {navigate('/promotion')}}>KHUYẾN MÃI</Nav.Link>

              <NavDropdown title="VỀ BHD STAR" id="about-dropdown">
                <NavDropdown.Item  onClick={() => {navigate('/detail-theater')}}>HỆ THỐNG RẠP</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => {navigate('/about-us')}}>VỀ CHÚNG TÔI</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* dang nhap dang ky */}
            <LoginButton />

            <FontAwesomeIcon 
              icon={faCartShopping}
              style={{ color: 'red', cursor: 'pointer', fontSize: '30px' }}
             className="text-danger" onClick={() => {
              navigate('/cart') 
            }}/>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
