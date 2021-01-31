import React from 'react';

type NavListProps = {
  align?: 'left' | 'center' | 'right';
  className?: string;
};

const NavList: React.FC<NavListProps> = (props) => {
  const { align, className }: NavListProps = props;

  return <ul className={`nav-list ${align} ${className}`}>{props.children}</ul>;
};

NavList.defaultProps = {
  align: 'left',
};

export default NavList;
