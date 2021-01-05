import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const NavTitle: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <li className='header-menu'>
      <span>{children}</span>
    </li>
  );
};

export default NavTitle;
