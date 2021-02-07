import React from 'react';
import { Layout } from 'antd';
import { WithAuth } from '@/hoc';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { AdminSidebar } from '@/components/AdminSidebar';

const AdminLayout: React.FC = (props) => {
  return (
    <WithAuth>
      <Layout>
        <HeaderContainer />
        <Layout hasSider>
          <Layout.Sider collapsible collapsedWidth={0} breakpoint='lg'>
            <AdminSidebar />
          </Layout.Sider>
          <Layout className='admin-container'>
            <Layout.Content className='admin-content'>{props.children}</Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </WithAuth>
  );
};

export default AdminLayout;
