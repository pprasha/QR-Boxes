import React from "react";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import "./bootstrap.css"
import "./Header.css"

function Header() {
    return (
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        // {/* <a class="navbar-brand" href="#">Navbar</a> */}
        // {/* Below for Responsive Nav bar. Remember to close the div tag at the end for Reponsive Nav to work. */}
        // <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //     <span className="navbar-toggler-icon"></span>
        // </button>
        // <div className="collapse navbar-collapse centerNav" id="navbarNavAltMarkup">
        //     <ul className="navbar-nav mx-auto">
        //         <li key="Home" className="nav-item active">
        //             <Link className="nav-link " to="/">
        //                 Home
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link className="nav-link " to="/box">
        //                 Box
        //             </Link>
        //         </li>
        //         {/* <li class="nav-item">
        //             <Link class="nav-link" to="/features">
        //                 Features
        //             </Link>
        //         </li>
        //         <li class="nav-item">
        //             <Link class="nav-link" to="/pricing">
        //                 Pricing
        //             </Link>
        //         </li>
        //         <li class="nav-item">
        //             <Link class="nav-link" to="/support">
        //                 Support
        //             </Link>
        //         </li> */}
        //     </ul>
        //     {/* <ul class="navbar-nav ml-auto">
        //         <li class="nav-item active">
        //             <Link class="nav-button" to="/sighnup">
        //                 <button type="button" class="btn btn-dark my-2 my-sm-0">Get Started</button>
        //             </Link>
        //         </li>
        //         <li class="nav-item active">
        //             <Link class="nav-link" to="/login">
        //                 Login
        //             </Link>
        //         </li>
        //     </ul> */}
        // </div>
        // </nav>

        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link className="nav-link logo" to="/">
                    <img src={Logo} alt="QR Boxe's Logo" className="navbar-brand" width="60" height="60" />
                    QR Boxes
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto navbar">
                    <Nav.Link>
                        <Link className="nav-link " to="/">
                            Home
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className="nav-link " to="/box">
                            Box
                        </Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        // <div>
        //     <Switch>
        //         <Route path="/box/:box_id" children={<Box />} />
        //     </Switch>
        // </div>
    );
}

export default Header;