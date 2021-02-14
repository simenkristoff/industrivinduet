import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem: React.FC<IProps> = (props) => {
  const { to, icon, className, onClick }: IProps = props;
  const classes: string[] = ['nav-item'];
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  return (
    <li className={classes.join(' ')}>
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
