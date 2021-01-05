import React from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = (props: any) => {
  return (
    <div id='page'>
      <Header />
      <div className='main-content'>
        <div className='container'>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
