import React from "react";
import logoImg from "../../textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom';

export class PublicNav extends React.Component {
    
    render() {
        return (
            <Navbar className="navbar" expand="xl" sticky="top">
                <Navbar.Brand href="/" className="navbrand">
                    <img
                    alt=""
                    src={logoImg}
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                
                    <Link href="/" className="navlink">
                        About
                    </Link>
                     
                     <Link href="/login" className="navlink">
                         Login
                     </Link>

            </Navbar>

      )
   }
}