import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UnlockOutlined,
  CalendarOutlined,
  SolutionOutlined,
  LayoutOutlined,
  PictureOutlined,
  ReadOutlined,
  ShopOutlined,
  ApartmentOutlined,
  UserOutlined,
  TagOutlined,
  TeamOutlined,
  ControlOutlined,
} from '@ant-design/icons';

import { IApplicationState, AuthState } from '@/types';
import { checkUserIsAdmin } from '@/state/ducks/auth/helpers';

const { SubMenu } = Menu;

/**
 * Reners the Admin sidebar
 */
export const AdminSidebar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const currentUser: AuthState = useSelector(({ auth }: IApplicationState) => auth);
  useEffect(() => {
    setIsAdmin(checkUserIsAdmin(currentUser));
  }, []);

  return (
    <Menu mode='inline' defaultSelectedKeys={['1']} style={{ height: '100%' }}>
      <Menu.Item key='1' icon={<DashboardOutlined />}>
        <Link to='/admin'>Dashboard</Link>
      </Menu.Item>
      {isAdmin && (
        <Menu.Item key='users' icon={<UnlockOutlined />}>
          <Link to='/admin/brukere'>Brukere</Link>
        </Menu.Item>
      )}
      <Menu.Item key='2' icon={<CalendarOutlined />}>
        <Link to='/admin/arrangementer'>Arrangementer</Link>
      </Menu.Item>
      <Menu.Item key='3' icon={<SolutionOutlined />}>
        <Link to='/admin/stillingsannonser'>Stillingsannonser</Link>
      </Menu.Item>
      <Menu.Item key='4' icon={<LayoutOutlined />}>
        <Link to='/admin/sider'>Sider</Link>
      </Menu.Item>
      <Menu.Item key='5' icon={<PictureOutlined />}>
        <Link to='/admin/media'>Mediebibliotek</Link>
      </Menu.Item>

      <Menu.Item key='6' icon={<ReadOutlined />}>
        <Link to='/admin/studieretninger'>Studieretninger</Link>
      </Menu.Item>
      <Menu.Item key='7' icon={<ShopOutlined />}>
        <Link to='/admin/samarbeidspartnere'>Partnere</Link>
      </Menu.Item>
      <SubMenu key='sub1' icon={<ApartmentOutlined />} title='Organisering'>
        <Menu.Item icon={<UserOutlined />}>
          <Link key='8' to='/admin/medlemmer'>
            Medlemmer
          </Link>
        </Menu.Item>
        <Menu.Item icon={<TagOutlined />}>
          <Link key='9' to='/admin/stillinger'>
            Stillinger
          </Link>
        </Menu.Item>
        <Menu.Item icon={<TeamOutlined />}>
          <Link key='10' to='/admin/grupper'>
            Grupper
          </Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='11' icon={<ControlOutlined />}>
        <Link to='/admin/innstillinger'>Innstillinger</Link>
      </Menu.Item>
    </Menu>
  );
};
