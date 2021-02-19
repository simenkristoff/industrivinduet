import React from 'react';
import { Layout } from 'antd';

import { WithAuth } from '@/hoc';
import { Container } from '@/components/Container';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { BreadcrumbContainer } from '@/containers/BreadcrumbContainer';
import { AdminSidebar } from '@/components/AdminSidebar';

/**
 * Wrapper component for all pages in the Admin namespace
 */
export const AdminLayout: React.FC = (props) => {
  return (
    <WithAuth>
      <HeaderContainer />
      <Layout hasSider>
        <Layout.Sider collapsible collapsedWidth={0} breakpoint='lg'>
          <AdminSidebar />
        </Layout.Sider>
        <Container>
          <Layout className='admin-container'>
            <BreadcrumbContainer isDashboard />
            <Layout.Content className='admin-content'>{props.children}</Layout.Content>
          </Layout>
        </Container>
      </Layout>
    </WithAuth>
  );
};
