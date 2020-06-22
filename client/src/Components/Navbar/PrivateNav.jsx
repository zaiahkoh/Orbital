import React from "react";
import logoImg from "../../textLogo.svg";
import { Navbar, Nav } from "react-bootstrap"
import NavIcon from "../NavIcon";
import { Link } from "react-router-dom";



export class PrivateNav extends React.Component {
    
    render() {
        return (
            <Navbar className="navbar" expand="xl" sticky="top">
                <Navbar.Brand href="/module-planner" className="navbrand">
                    <img
                    alt=""
                    src={logoImg}
                    width="150"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                
                    <Link to="/select-modules" className="navlink">
                            Select Module
                    </Link>

                    <Link to="/module-planner" className="navlink">
                        Module Planner
                    </Link>

                    <Link to="/cap-calculator" className="navlink">
                        CAP Calculator
                    </Link>

                    <Link to="/dashboard" className="navlink">
                        Dashboard
                    </Link>

                     {/* <NavIcon icon={this.props.userProfilePicture} /> */}
                     {/* <NavIcon icon={logoImg} /> */}
                     <Link to="/settings/academics" className="navlink">
                         Settings
                     </Link>

            </Navbar>

      )
   }
}