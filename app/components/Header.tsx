import React from 'react';
import { LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import Logo from '@resources/logo.png';
import Nav from '@/components/Navigation';
import { MemberEntity } from '@/state/ducks/member/types';

import { AdminToolbar } from './AdminToolbar';

interface IProps {
  isAdminNamespace: boolean;
  isLoggedIn: boolean;
  member: MemberEntity | null;
  logout: () => void;
}

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
              <Nav.Item key='register' to='/registrer' icon={<UserAddOutlined />}>
                Registrer deg
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
