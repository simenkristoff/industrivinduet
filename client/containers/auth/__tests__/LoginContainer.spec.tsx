import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginContainer } from '@/containers/auth/LoginContainer';
import { Login } from '@/components/auth/Login';
import configureStore from '@/state/configureStore';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <LoginContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Provider store={store}>
          <LoginContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(LoginContainer);
    component = container.find(Login);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    wrapper.unmount();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['loading', 'response'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['login'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });
});
