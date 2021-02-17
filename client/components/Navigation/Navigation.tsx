import React, { useState, useRef } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { NavigationList } from './NavigationList';
import { NavigationItem } from './NavigationItem';
import { NavigationType, NavigationInterface } from './interface';

/**
 * Navigation wrapper component
 */
export const Navigation: NavigationType = (props) => {
  const { id, toggler, logo, className }: NavigationInterface = props;
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
        <Link to='/' className='nav-brand'>
          <img src={logo} alt={logo} />
        </Link>
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

Navigation.defaultProps = {
  id: 'main-navigation',
  toggler: <MenuOutlined />,
};

Navigation.List = NavigationList;
Navigation.Item = NavigationItem;
