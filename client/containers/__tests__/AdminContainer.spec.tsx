import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { checkUserIsAdmin } from '@/state/ducks/auth/helpers';
import { AdminContainer } from '@/containers/AdminContainer';
import { AdminLanding } from '@/components/AdminLanding';
import configureStore from '@/state/configureStore';
import {
  MemberActionTypes,
  RoleActionTypes,
  UserActionTypes,
  EventActionTypes,
  JobActionTypes,
} from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <AdminContainer /> as USER', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <AdminContainer />
      </Provider>,
    );
    container = wrapper.find(AdminContainer);
    component = container.find(AdminLanding);
    wrapper.unmount();
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = [
      'isAdmin',
      'leaders',
      'nonOccupied',
      'userCount',
      'adminCount',
      'roleCount',
      'events',
      'jobs',
      'loading',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = [
      'fetchMembers',
      'fetchRoles',
      'fetchUsers',
      'fetchEvents',
      'fetchJobs',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(4);

    expect(actions[0][0]['type']).toBe(MemberActionTypes.FETCH.START);
    expect(actions[1][0]['type']).toBe(RoleActionTypes.FETCH.START);
    expect(actions[2][0]['type']).toBe(EventActionTypes.FETCH.START);
    expect(actions[3][0]['type']).toBe(JobActionTypes.FETCH.START);
  });
});

describe('container <AdminContainer /> as ADMIN', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    (checkUserIsAdmin as any) = jest.fn().mockReturnValue(true);
    wrapper = mount(
      <Provider store={store}>
        <AdminContainer />
      </Provider>,
    );
    container = wrapper.find(AdminContainer);
    component = container.find(AdminLanding);
    wrapper.unmount();
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(5);

    expect(actions[0][0]['type']).toBe(MemberActionTypes.FETCH.START);
    expect(actions[1][0]['type']).toBe(RoleActionTypes.FETCH.START);
    expect(actions[2][0]['type']).toBe(EventActionTypes.FETCH.START);
    expect(actions[3][0]['type']).toBe(JobActionTypes.FETCH.START);
    expect(actions[4][0]['type']).toBe(UserActionTypes.FETCH.START);
  });
});
