import React from 'react';

interface IProps {
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const NavList: React.FC<IProps> = (props) => {
  const { align, className }: IProps = props;

  return <ul className={`nav-list ${align} ${className}`}>{props.children}</ul>;
};

NavList.defaultProps = {
  align: 'left',
};

export default NavList;
