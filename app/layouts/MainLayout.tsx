import React from 'react';
import { Layout } from 'antd';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { FooterContainer } from '@/containers/FooterContainer';
import Container from '@/components/Container';

const MainLayout = (props: any) => {
  return (
    <Layout>
      <HeaderContainer />
      <Container className='main-container'>
        <Layout>
          <Layout.Content className='main-content'>{props.children}</Layout.Content>
        </Layout>
      </Container>
      <FooterContainer />
    </Layout>
  );
};

export default MainLayout;
