import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { EventSingleContainer } from '@/containers/EventSingleContainer';
import { EventSingle } from '@/components/EventSingle';
import configureStore from '@/state/configureStore.dev';
import { EventActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <EventSingleContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;

  it('should render both container and component', () => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer/1']}>
          <EventSingleContainer />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(EventSingleContainer);
    component = container.find(EventSingle);
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
    wrapper.unmount();
  });

  it('should map state to props', () => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer/1']}>
          <EventSingleContainer />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(EventSingleContainer);
    component = container.find(EventSingle);
    const expectedPropKeys = ['data', 'loading'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    wrapper.unmount();
  });

  it('should fetch data on mount', () => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer/1']}>
          <EventSingleContainer />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(EventSingleContainer);
    component = container.find(EventSingle);
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(1);

    expect(actions[0][0]['type']).toBe(EventActionTypes.FETCH_ONE.START);
    wrapper.unmount();
  });

  it('should clear data on unmount', () => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer/1']}>
          <EventSingleContainer />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.unmount();
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(2);
    expect(actions[0][0]['type']).toBe(EventActionTypes.FETCH_ONE.START);
    expect(actions[1][0]['type']).toBe(EventActionTypes.SET.START);
  });
});
