import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserStart } from '../../redux/User/user.actions';
import { Link, useHistory } from 'react-router-dom';

// Logo
import Logo from './../../assets/img/logo.png';

// Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Types
import { RootState } from '../../types';

const mapState = ({ user }: RootState) => ({
  isLoggedIn: user.isLoggedIn,
});

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector(mapState);

  const logout = () => {
    dispatch(logoutUserStart());
    history.push('/');
  };

  return (
    <header className='site-header'>
      <div className='container'>
        <Navbar bg='transparent' expand='lg' className='site-navigation'>
          <Link className='navbar-brand' to='/'>
            <img className='logo' src={Logo} alt='Industrivinduet' />
          </Link>
          <Navbar.Toggle aria-controls='main-navigation' />
          <Navbar.Collapse id='main-navigation'>
            <Nav className='ml-auto' defaultActiveKey='/' as='ul'>
              <Nav.Item>
                <Link className='nav-link' to='/'>
                  Hjem
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className='nav-link' to='/'>
                  Arrangementer
                </Link>
              </Nav.Item>
              {isLoggedIn && (
                <Nav.Item>
                  <a className='nav-link' onClick={() => logout()}>
                    Logg ut
                  </a>
                </Nav.Item>
              )}
              {!isLoggedIn && [
                <Nav.Item key='login'>
                  <Link className='nav-link' to='/logg_inn'>
                    Logg inn
                  </Link>
                </Nav.Item>,
                <Nav.Item key='register'>
                  <Link className='nav-link' to='/registrer'>
                    Registrer bruker
                  </Link>
                </Nav.Item>,
              ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
