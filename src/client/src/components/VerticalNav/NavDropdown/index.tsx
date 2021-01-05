import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

interface IProps {
  title: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}

const NavDropdown: React.FC<IProps> = ({ title, icon, children }: IProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [style, setStyle] = useState<React.CSSProperties>({
    display: 'none',
    opacity: 0,
    transform: 'scaleY(0)',
  });
  const NavIcon = icon;

  const toggle = () => {
    if (!active) {
      setStyle({ ...style, display: 'block' });
      setTimeout(() => setStyle({ opacity: 1, transform: 'scaleY(1)' }), 150);
    } else {
      setStyle({ ...style, opacity: 0 });
      setTimeout(() => setStyle({ display: 'none', transform: 'scaleY(0)' }), 150);
    }
    setActive(!active);
  };

  return (
    <li className={`sidebar-nav-item sidebar-dropdown ${active ? 'active' : ''}`}>
      <a onClick={toggle}>
        {NavIcon && <NavIcon />}
        <span>{title}</span>
        <FaAngleRight className='dropdown-arrow' />
      </a>
      <div className='sidebar-submenu' style={style}>
        <ul>{children}</ul>
      </div>
    </li>
  );
};

export default NavDropdown;
