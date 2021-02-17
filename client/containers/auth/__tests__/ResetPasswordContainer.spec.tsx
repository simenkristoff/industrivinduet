import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { ResetPasswordContainer } from '@/containers/auth/ResetPasswordContainer';
import { ResetPassword } from '@/components/auth/ResetPassword';
import configureStore from '@/state/configureStore';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <ResetPasswordContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          '/tilbakestill/3f62c4e1bfc00d93ef532bad256757dc538ad5cc5f6a252507114f26a81153cd',
        ]}
      >
        <Provider store={store}>
          <ResetPasswordContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(ResetPasswordContainer);
    component = container.find(ResetPassword);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    wrapper.unmount();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['token', 'loading', 'response'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['reset'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });
});
