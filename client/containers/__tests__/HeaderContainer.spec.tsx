import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { HeaderContainer } from '@/containers/HeaderContainer';
import { Header } from '@/components/Header';
import { AdminToolbar } from '@/components/AdminToolbar';
import { Nav } from '@/components/Navigation';
import configureStore from '@/state/configureStore';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <HeaderContainer />', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  let wrapper, store: any, container, component: any;
  const path = ['/arrangementer'];

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should render both container and component', () => {
    useSelectorMock.mockReturnValue({ isAdminNamespace: false, isLoggedIn: true, member: null });
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={path}>
        <Provider store={store}>
          <HeaderContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(HeaderContainer);
    component = container.find(Header);
    const adminToolbar = component.find(AdminToolbar);
    const nav = component.find(Nav);
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    expect(adminToolbar.length).toBeTruthy();
    expect(nav.length).toBeTruthy();
    wrapper.unmount();
  });

  it('should not render navigation in admin namespace', () => {
    useSelectorMock.mockReturnValue({ isAdminNamespace: true, isLoggedIn: true, member: null });
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={path}>
        <Provider store={store}>
          <HeaderContainer />
        </Provider>
      </MemoryRouter>,
    );
    wrapper.update();
    container = wrapper.find(HeaderContainer);
    component = container.find(Header);
    const adminToolbar = component.find(AdminToolbar);
    const nav = component.find(Nav);
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    expect(adminToolbar.length).toBeTruthy();
    expect(nav.length).not.toBeTruthy();
    wrapper.unmount();
  });

  it('should map state to props', () => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={path}>
        <Provider store={store}>
          <HeaderContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(HeaderContainer);
    component = container.find(Header);
    const expectedPropKeys = ['isAdminNamespace', 'isLoggedIn', 'member'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should map dispatch to props', () => {
    store = configureStore(store);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={path}>
        <Provider store={store}>
          <HeaderContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(HeaderContainer);
    component = container.find(Header);
    const expectedPropKeys = ['logout'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should call logout action', () => {});
});
