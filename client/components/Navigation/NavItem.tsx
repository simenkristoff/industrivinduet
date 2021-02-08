import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { to, icon, className, onClick }: NavItemProps = props;

  return (
    <li className={`nav-item ${className}`}>
      <Link className='nav-link' to={to!} onClick={onClick}>
        {icon}
        {props.children}
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  to: '',
};

export default NavItem;
