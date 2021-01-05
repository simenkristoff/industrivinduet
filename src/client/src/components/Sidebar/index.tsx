import React from 'react';
import Logo from './../../assets/img/logo.png';
import * as FaIcons from 'react-icons/fa';

// Components
import VerticalNav from '../VerticalNav';

const AdminSidebar = () => {
  return (
    <VerticalNav img={Logo} alt='Industrivinduet Dashboard' defaultOpen={true} isClosable={true} id='admin-navigation'>
      <VerticalNav.NavTitle>Dashboard</VerticalNav.NavTitle>
      <VerticalNav.NavLink to='/admin/test'>Test</VerticalNav.NavLink>
      <VerticalNav.NavLink to='/admin/arrangementer' icon={FaIcons.FaCalendarAlt}>
        Arrangementer
      </VerticalNav.NavLink>
      <VerticalNav.NavLink to='/admin/stillingsannonser' icon={FaIcons.FaSuitcase}>
        Stillingsannonser
      </VerticalNav.NavLink>
      <VerticalNav.NavDropdown title='Organisering' icon={FaIcons.FaSitemap}>
        <VerticalNav.NavLink to='/admin/medlemmer'>Medlemmer</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/stillinger'>Stillinger</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/grupper'>Grupper</VerticalNav.NavLink>
      </VerticalNav.NavDropdown>
      <VerticalNav.NavDropdown title='Innstillinger' icon={FaIcons.FaCogs}>
        <VerticalNav.NavLink to='/admin/innstillinger/generelt'>Generelt</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/innstillinger/forside'>Forside</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/innstillinger/profilering'>Profilering</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/innstillinger/arrangementer'>Arrangementer</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/innstillinger/stillingsannonser'>Stillingsannonser</VerticalNav.NavLink>
        <VerticalNav.NavLink to='/admin/innstillinger/sosiale-medier'>Sosiale medier</VerticalNav.NavLink>
      </VerticalNav.NavDropdown>
    </VerticalNav>
  );
};

export default AdminSidebar;
