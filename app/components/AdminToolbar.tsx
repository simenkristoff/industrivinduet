import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface IProps {
  isLoggedIn: boolean;
  isAdminNamespace: boolean;
  name?: {
    first: string;
    last: string;
  };
  logout: () => void;
}

export const AdminToolbar: React.FC<IProps> = ({
  isLoggedIn,
  isAdminNamespace,
  name,
  logout,
}: IProps) => {
  if (!isLoggedIn) return null;

  return (
    <Menu
      className='admin-toolbar'
      theme='dark'
      mode='horizontal'
      style={{ backgroundColor: 'none' }}
    >
      {isAdminNamespace && (
        <Menu.Item key='1' icon={<ArrowLeftOutlined />}>
          <Link to='/'>Tilbake til nettsiden</Link>
        </Menu.Item>
      )}
      <Menu.Item key='2'>
        <Link to='/admin'>{name?.first}</Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <a onClick={() => logout()}>Logg ut</a>
      </Menu.Item>
    </Menu>
  );
};
