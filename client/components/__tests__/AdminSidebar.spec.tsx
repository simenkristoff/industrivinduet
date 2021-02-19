import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { Link, MemoryRouter } from 'react-router-dom';

import configureStore from '@/state/configureStore';
import { AdminSidebar } from '@/components/AdminSidebar';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');
const { Provider } = reactRedux;

const routes = [
  '/admin',
  '/admin/brukere',
  '/admin/arrangementer',
  '/admin/stillingsannonser',
  '/admin/sider',
  '/admin/media',
  '/admin/studieretninger',
  '/admin/samarbeidspartnere',
  '/admin/medlemmer',
  '/admin/stillinger',
  '/admin/grupper',
  '/admin/innstillinger',
];

describe('component <AdminSidebar />', () => {
  let wrapper: any, container: any, links: Array<any>;
  const store = configureStore(initialState);
  store.dispatch = jest.fn();

  it('should include all routes', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <AdminSidebar />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(AdminSidebar);
    links = container.find('a');
    links.forEach((link) => {
      const i = routes.indexOf(link.at(0).props().href);
      expect(i).toBeGreaterThan(-1);
      routes.splice(i, 1);
    });
  });
});
