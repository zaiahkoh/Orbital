import React from "react";
import logoImg from "./textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./Page/LoginPage/style.scss"
import NavIcon from "./Components/NavIcon";


export class ModTreeNav extends React.Component {
    
    render() {
        return (
            <Navbar className="navbar" bg='dark' style={{color: '#11224b' }} expand="xl" sticky="top">
                <Navbar.Brand href="/module-planner">
                    <img
                    alt=""
                    src={logoImg}
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}

                </Navbar.Brand>
                
                    <Nav.Link href="/select-modules" className="text=white text-decoration-none">
                            Select Module
                    </Nav.Link>
                     <Nav.Link href="/module-planner">
                            Module Planner
                     </Nav.Link>
                     <Nav.Link href="/cap-calculator">
                            CAP Calculator
                     </Nav.Link>
                     <Nav.Link href="/login">
                            Account Settings
                     </Nav.Link>

                     {/* <NavIcon icon={this.props.userProfilePicture} /> */}
                     {/* <NavIcon icon={logoImg} /> */}
                     <Nav.Link href="/first-setting">
                         First Setting
                     </Nav.Link>

                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>

      )
   }
}