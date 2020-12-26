import React, {useState} from 'react';
import {FaAngleRight} from 'react-icons/fa';

const NavDropdown = ({title, icon, children}) => {
    const [openNav, setOpenNav] = useState(false);
    const NavIcon = icon;

    const handleClick = () => {
        setOpenNav(() => {
            if(openNav) {
                return false;
            }

            return true;
        })
    }

    return (
        <li className={`sidebar-nav-item sidebar-dropdown ${openNav ? 'active' : ''}`}>
            <a onClick={handleClick}>
                {NavIcon && (
                    <NavIcon />
                )}
                <span>{title}</span>
                <FaAngleRight className="dropdown-arrow" />
            </a>
            <div className="sidebar-submenu">
                <ul>
                    {children}
                </ul>
            </div>
        </li>
    );
};

export default NavDropdown;
