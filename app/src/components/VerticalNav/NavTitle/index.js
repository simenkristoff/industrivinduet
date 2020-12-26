import React from 'react';

const NavTitle = props => {
    return (
        <li className="header-menu">
            <span>{props.children}</span>
        </li>
    );
};

export default NavTitle;
