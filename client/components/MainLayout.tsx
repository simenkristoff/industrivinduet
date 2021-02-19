import React from 'react';
import { Layout } from 'antd';

import { HeaderContainer } from '@/containers/HeaderContainer';
import { BreadcrumbContainer } from '@/containers/BreadcrumbContainer';
import { FooterContainer } from '@/containers/FooterContainer';
import { Container } from '@/components/Container';

/**
 * Wrapper component for pages
 */
export const MainLayout: React.FC = (props: any) => {
  return (
    <>
      <HeaderContainer />
      <Container className='main-container'>
        <Layout>
          <BreadcrumbContainer />
          <Layout.Content className='main-content'>{props.children}</Layout.Content>
        </Layout>
      </Container>
      <FooterContainer />
    </>
  );
};
