import React from "react";
import { Link } from "react-router-dom";
import logoImg from "./textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./Page/LoginPage/style.scss"

export class ModTreeNav extends React.Component {
    
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
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
                     <Nav.Link href="/">
                            Logout
                     </Nav.Link>

                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>

      )
   }
}