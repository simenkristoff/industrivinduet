import React from 'react';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import { MemberEntity } from '@/types';
import { AdminToolbar } from '@/components/AdminToolbar';
import { Nav } from '@/components/Navigation';
import Logo from '@resources/logo.png';

interface IProps {
  isAdminNamespace: boolean;
  isLoggedIn: boolean;
  member: MemberEntity | null;
  logout: () => void;
}

/**
 * Renders the site's main header
 */
export const Header: React.FC<IProps> = ({
  isAdminNamespace,
  isLoggedIn,
  member,
  logout,
}: IProps) => {
  return (
    <header className='site-header'>
      <AdminToolbar
        isAdminNamespace={isAdminNamespace}
        isLoggedIn={isLoggedIn}
        name={member?.name}
        logout={logout}
      />
      {!isAdminNamespace && (
        <Nav logo={Logo}>
          <Nav.List align='left'>
            <Nav.Item to='/'>Hjem</Nav.Item>
            <Nav.Item to='/arrangementer'>Arrangementer</Nav.Item>
            <Nav.Item to='/stillingsannonser'>Stillingsannonser</Nav.Item>
            <Nav.Item to='/om_oss'>Om oss</Nav.Item>
            <Nav.Item to='/kontakt'>Kontakt</Nav.Item>
          </Nav.List>
          <Nav.List align='right'>
            {!isLoggedIn && [
              <Nav.Item key='signup' to='/logg_inn' icon={<LoginOutlined />}>
                Logg inn
              </Nav.Item>,
            ]}
            {isLoggedIn && (
              <Nav.Item icon={<LogoutOutlined />} onClick={() => logout()}>
                Logg ut
              </Nav.Item>
            )}
          </Nav.List>
        </Nav>
      )}
    </header>
  );
};
