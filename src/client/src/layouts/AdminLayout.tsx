import React from 'react';

// Components
import Sidebar from '../components/Sidebar';

const AdminLayout = (props: any) => {
  return (
    <div id='page' className='bg-light'>
      <Sidebar />
      <div className='admin-content'>
        <div className='container'>{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
