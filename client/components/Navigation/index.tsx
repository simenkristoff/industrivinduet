import React, { useState, useRef } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';

import NavList from './NavList';
import NavItem from './NavItem';

interface IProps {
  id?: string;
  logo?: string;
  toggler?: React.ReactNode;
  className?: string;
}

type INav<P> = React.FC<P> & {
  List: typeof NavList;
  Item: typeof NavItem;
};

const Nav: INav<IProps> = (props) => {
  const { id, toggler, logo, className }: IProps = props;
  const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [toggled, setToggled] = useState(false);
  const classes: string[] = ['nav-menu', 'nav-menu-expand'];
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  const handleToggle = () => {
    if (!toggled) menuRef.current.classList.add('show');
    else menuRef.current.classList.remove('show');
    setToggled(!toggled);
  };

  return (
    <nav className={classes.join(' ')} id={id}>
      {logo && (
        <a className='nav-brand'>
          <img src={logo} />
        </a>
      )}
      <button className='navigation-toggler' type='button' onClick={handleToggle}>
        {toggler}
      </button>
      <div ref={menuRef} className='nav-bar-wrapper'>
        <CSSTransition in={toggled} timeout={350} unmountOnExit={false} classNames='fade'>
          <div className='nav-bar'>{props.children}</div>
        </CSSTransition>
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  id: 'main-navigation',
  toggler: <MenuOutlined />,
};

Nav.List = NavList;
Nav.Item = NavItem;

export default Nav;
