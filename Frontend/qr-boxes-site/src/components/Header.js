import React from "react";
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Logo from "./logo.png";
import "./bootstrap.css"
import "./Header.css"

function Header() {
    const history = useHistory();

    const LogIn = () => {
        history.push("/login");
    }
    const SignUp = () => {
        history.push("/signup");
    }

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
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link className="nav-link logo" to="/">
                        <img src={Logo} alt="QR Boxe's Logo" className="navbar-brand" width="40" height="45" />
                        QR Boxes <p className="beta">BETA</p>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle className="mobile_nav" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar-nav abs-center-x">
                        {/* <Nav.Link> */}
                        <Link className="nav-link " to="/">
                            Home
                        </Link>
                        {/* </Nav.Link> */}
                        {/* <Nav.Link> */}
                        <Link className="nav-link " to="/box">
                            Box
                        </Link>
                        {/* </Nav.Link> */}
                        <Link className="nav-link " to="/pricing">
                            Pricing
                        </Link>
                    </Nav >
                    {/* <div className="navbar-left">
                        <Button variant="success" className="signin" onClick={LogIn}>Log In</Button>{' '}
                        <Button variant="success" className="signup" onClick={SignUp}>Sign Up</Button>{' '}
                    </div>     */}

                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Header;