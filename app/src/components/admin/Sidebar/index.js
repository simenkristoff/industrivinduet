import React from 'react';
import Logo from './../../../assets/img/logo.png';
import * as FaIcons from 'react-icons/fa';

// Components
import VerticalNav from './../../VerticalNav';

const AdminSidebar = props => {
    return (
        <VerticalNav 
            img={Logo} alt='Industrivinduet Dashboard' 
            defaultOpen={true} 
            isClosable={true}
            id='admin-navigation'
        >
            <VerticalNav.NavTitle>
                Dashboard
            </VerticalNav.NavTitle>
            <VerticalNav.NavLink to="/admin/arrangementer" icon={FaIcons.FaCalendarAlt}>
                Arrangementer
            </VerticalNav.NavLink>
            <VerticalNav.NavLink to="/admin/stillingsannonser" icon={FaIcons.FaSuitcase}>
                Stillingsannonser
            </VerticalNav.NavLink> 
            <VerticalNav.NavDropdown title="Organisering" icon={FaIcons.FaSitemap}>
                <VerticalNav.NavLink to="/admin/medlemmer">
                    Medlemmer
                    <span className="badge badge-pill badge-success"></span>
                </VerticalNav.NavLink>
                <VerticalNav.NavLink to="/admin/stillinger">
                    Stillinger
                    <span className="badge badge-pill badge-success"></span>
                </VerticalNav.NavLink>
                <VerticalNav.NavLink to="/admin/grupper">
                    Grupper
                    <span className="badge badge-pill badge-success"></span>
                </VerticalNav.NavLink>
            </VerticalNav.NavDropdown>
            <VerticalNav.NavLink to="/admin/innstillinger" icon={FaIcons.FaCogs}>
                Innstillinger
            </VerticalNav.NavLink>
        </VerticalNav>
    )

};

export default AdminSidebar;
