import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { RegisterContainer } from '@/containers/auth/RegisterContainer';
import { Register } from '@/components/auth/Register';
import configureStore from '@/state/configureStore.dev';
import { UserActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <RegisterContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <MemoryRouter
        initialEntries={[
          '/registrer/3f62c4e1bfc00d93ef532bad256757dc538ad5cc5f6a252507114f26a81153cd',
        ]}
      >
        <Provider store={store}>
          <RegisterContainer />
        </Provider>
      </MemoryRouter>,
    );
    container = wrapper.find(RegisterContainer);
    component = container.find(Register);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    wrapper.unmount();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['user', 'loading', 'response'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['register'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should lookup token on mount on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(1);

    expect(actions[0][0]['type']).toBe(UserActionTypes.LOOKUP_REGISTER_TOKEN.START);
    wrapper.unmount();
  });
});
