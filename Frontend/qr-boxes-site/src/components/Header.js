import React from "react";
import { Link } from "react-router-dom";
import "./bootstrap.css"

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse centerNav" id="navbarNav">
            <ul className="navbar-nav mx-auto">
                <li key="Home" className="nav-item active">
                    <Link className="nav-link " to="/">
                        Home
                    </Link>
                </li>
                {/* <li class="nav-item">
                    <Link class="nav-link" to="/features">
                        Features
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/pricing">
                        Pricing
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/support">
                        Support
                    </Link>
                </li> */}
            </ul>
            {/* <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <Link class="nav-button" to="/sighnup">
                        <button type="button" class="btn btn-dark my-2 my-sm-0">Get Started</button>
                    </Link>
                </li>
                <li class="nav-item active">
                    <Link class="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul> */}
        </div>
        </nav>
    );
}

export default Header;