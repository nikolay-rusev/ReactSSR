import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">React SSR</Link>
                <ul className="right">
                    <li><Link to="/users">Users</Link></li>
                </ul>
            </div>
        </nav>
    );
}