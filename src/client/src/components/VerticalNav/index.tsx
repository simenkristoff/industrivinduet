import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

// Testing
import NavTitle from './NavTitle';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

interface IProps {
  defaultOpen: boolean;
  isClosable: boolean;
  id?: string;
  img?: string;
  alt?: string;
  children?: React.ReactNode;
}

const VerticalNav: React.FC<IProps> & {
  NavTitle: typeof NavTitle;
  NavDropdown: typeof NavDropdown;
  NavLink: typeof NavLink;
} = (props: IProps) => {
  const [openSidebar, setOpenSidebar] = useState(props.defaultOpen);
  const isClosable = props.isClosable !== undefined ? props.isClosable : true;

  const handleChange = () => {
    if (isClosable) {
      if (openSidebar) {
        setOpenSidebar(false);
      } else {
        setOpenSidebar(true);
      }
    }
  };

  useEffect(() => {
    const appDiv: HTMLElement | null = document.getElementById('App');
    if (!appDiv) return;

    if (openSidebar) {
      appDiv.classList.add('sidebar-open');
    }

    return function cleanup() {
      appDiv.classList.remove('sidebar-open');
    };
  }, [handleChange]);

  return (
    <div className={`sidebar ${openSidebar ? 'toggled' : ''}`}>
      {isClosable && (
        <a id='show-sidebar' className='btn btn-sm btn-dark' onClick={handleChange}>
          <FaBars />
        </a>
      )}

      <nav id={props.id} className='sidebar-wrapper'>
        <div className='sidebar-content'>
          <div className='sidebar-brand'>
            {isClosable && (
              <a id='close-sidebar' onClick={handleChange}>
                <FaTimes />
              </a>
            )}
            <img className='logo' src={props.img} alt={props.alt} />
          </div>

          <div className='sidebar-header'></div>

          <div className='sidebar-menu'>
            <ul>{props.children}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

VerticalNav.NavTitle = NavTitle;
VerticalNav.NavDropdown = NavDropdown;
VerticalNav.NavLink = NavLink;

export default VerticalNav;
