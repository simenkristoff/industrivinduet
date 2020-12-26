import React from 'react';
import {Link} from 'react-router-dom';

const NavLink = ({to, icon, children}) => {
    const NavIcon = icon;

    return (
        <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to={to}>
                {NavIcon && (
                    <NavIcon />
                )}
                {children}
            </Link>
        </li>
    );
};

export default NavLink;
