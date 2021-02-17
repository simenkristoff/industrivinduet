import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { ForgotPasswordContainer } from '@/containers/auth/ForgotPasswordContainer';
import { ForgotPassword } from '@/components/auth/ForgotPassword';
import configureStore from '@/state/configureStore';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <ForgotPasswordContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <ForgotPasswordContainer />
      </Provider>,
    );
    container = wrapper.find(ForgotPasswordContainer);
    component = container.find(ForgotPassword);
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
    const expectedPropKeys = ['forgot'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });
});
