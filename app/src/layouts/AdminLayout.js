import React from 'react';

// Components
import Sidebar from './../components/admin/Sidebar';

const AdminLayout = props => {
    return (
        <div id="page" className="bg-light">
            <Sidebar />
            <div className="admin-content">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
