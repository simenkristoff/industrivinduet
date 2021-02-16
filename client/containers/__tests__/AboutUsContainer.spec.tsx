import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { AboutUsContainer } from '@/containers/AboutUsContainer';
import { AboutUs } from '@/components/AboutUs';
import configureStore from '@/state/configureStore.dev';
import { ContentActionTypes, MemberActionTypes, PartnerActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <AboutUsContainer />', () => {
  let wrapper, store: any, container, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <AboutUsContainer />
      </Provider>,
    );
    container = wrapper.find(AboutUsContainer);
    component = container.find(AboutUs);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['data', 'members', 'partners', 'loading'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(3);

    expect(actions[0][0]['type']).toBe(ContentActionTypes.FETCH.START);
    expect(actions[1][0]['type']).toBe(MemberActionTypes.FETCH.START);
    expect(actions[2][0]['type']).toBe(PartnerActionTypes.FETCH.START);
  });
});
