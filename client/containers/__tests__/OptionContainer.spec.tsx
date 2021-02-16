import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { OptionContainer } from '@/containers/OptionContainer';
import { OptionForm } from '@/components/forms';
import configureStore from '@/state/configureStore.dev';
import { OptionActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <OptionContainer />', () => {
  let wrapper, store: any, container, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <OptionContainer />
      </Provider>,
    );
    container = wrapper.find(OptionContainer);
    component = container.find(OptionForm);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(1);

    expect(actions[0][0]['type']).toBe(OptionActionTypes.FETCH.START);
  });
});
