import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import memberData from '@/__mocks__/memberData';
import roleData from '@/__mocks__/roleData';
import userData from '@/__mocks__/userData';
import eventData from '@/__mocks__/eventData';
import jobData from '@/__mocks__/jobData';
import { AdminLanding } from '@/components/AdminLanding';
import configureStore from '@/state';

import { Spinner } from '../Spinner';
import { JobItem } from '../JobItem';
import { EventItem } from '../EventItem';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');
const { Provider } = reactRedux;

const props = {
  isAdmin: true,
  memberCount: memberData.length,
  nonOccupied: [memberData[0]],
  leaders: [memberData[1]],
  roleCount: roleData.length,
  userCount: userData.length,
  adminCount: 1,
  events: eventData,
  jobs: jobData,
  fetchMembers: jest.fn(),
  fetchRoles: jest.fn(),
  fetchUsers: jest.fn(),
  fetchEvents: jest.fn(),
  fetchJobs: jest.fn(),
  loading: false,
};

describe('component <AdminLanding />', () => {
  let wrapper: any, container: any, component: any;
  const store: any = configureStore(initialState);
  store.dispatch = jest.fn();

  it('should render spinner', () => {
    var loadingProps = { ...props, loading: true };
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <AdminLanding {...loadingProps} />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(AdminLanding);
    const spinner = container.find(Spinner);
    component = container.find('.admin-landing');
    expect(spinner.length).toBeTruthy();
    expect(component.length).not.toBeTruthy();
  });

  it('should render admin landing contents', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <AdminLanding {...props} />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(AdminLanding);
    const spinner = container.find(Spinner);
    component = container.find('.admin-landing');
    expect(spinner.length).not.toBeTruthy();
    expect(component.length).toBeTruthy();

    // Job Items
    const jobItems = component.find(JobItem);
    expect(jobItems.length).toBe(jobData.length);

    // Event Items
    const eventItems = component.find(EventItem);
    expect(eventItems.length).toBe(eventData.length);

    // User count
    const userCount = component.find('.user-count h2').at(0).text();
    expect(parseInt(userCount)).toBe(props.userCount);

    // Admin count
    const adminCount = component.find('.admin-count h2').at(0).text();
    expect(parseInt(adminCount)).toBe(props.adminCount);

    // Non-occupied count
    const nonOcCount = component.find('.non_occupied-count .non_occupied-wrapper');
    expect(nonOcCount.length).toBe(props.nonOccupied.length);

    // Member count
    const memberCount = component.find('.member-count h2').at(0).text();
    expect(parseInt(memberCount)).toBe(props.memberCount);

    // Role count
    const roleCount = component.find('.role-count h2').at(0).text();
    expect(parseInt(roleCount)).toBe(props.roleCount);

    // Leader count
    const leaderCount = component.find('.leaders .leader-wrapper');
    expect(leaderCount.length).toBe(props.leaders.length);
  });
});
