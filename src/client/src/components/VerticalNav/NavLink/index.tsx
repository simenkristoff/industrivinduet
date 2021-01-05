import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}

const NavLink: React.FC<IProps> = ({ to, icon, children }: IProps) => {
  const NavIcon = icon;

  return (
    <li className='sidebar-nav-item'>
      <Link className='sidebar-nav-link' to={to}>
        {NavIcon && <NavIcon />}
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
