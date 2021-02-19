import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '@/state/configureStore';
import { Admin } from '@/components/Admin';
import { AdminContainer } from '@/containers/AdminContainer';
import { MediaContainer } from '@/containers/MediaContainer';
import { OptionContainer } from '@/containers/OptionContainer';
import {
  UserContainer,
  ContentContainer,
  StudyFieldContainer,
  PartnerContainer,
  GroupContainer,
  RoleContainer,
  MemberContainer,
  EventContainer,
  JobContainer,
} from '@/containers/crud';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');
const { Provider } = reactRedux;

describe('component <Admin />', () => {
  let wrapper: any, container: any, component: any;
  const store = configureStore(initialState);
  store.dispatch = jest.fn();

  it('should show AdminContainer for /admin route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(AdminContainer);
    expect(component).toHaveLength(1);
  });

  it('should show UserContainer for /admin/brukere route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/brukere']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(UserContainer);
    expect(component).toHaveLength(1);
  });

  it('should show EventContainer for /admin/arrangementer route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/arrangementer']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(EventContainer);
    expect(component).toHaveLength(1);
  });

  it('should show JobContainer for /admin/stillingsannonser route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/stillingsannonser']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(JobContainer);
    expect(component).toHaveLength(1);
  });

  it('should show ContentContainer for /admin/sider route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/sider']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(ContentContainer);
    expect(component).toHaveLength(1);
  });

  it('should show MediaContainer for /admin/media route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/media']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(MediaContainer);
    expect(component).toHaveLength(1);
  });

  it('should show StudyFieldContainer for /admin/studieretninger route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/studieretninger']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(StudyFieldContainer);
    expect(component).toHaveLength(1);
  });

  it('should show PartnerContainer for /admin/samarbeidspartnere route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/samarbeidspartnere']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(PartnerContainer);
    expect(component).toHaveLength(1);
  });

  it('should show MemberContainer for /admin/medlemmer route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/medlemmer']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(MemberContainer);
    expect(component).toHaveLength(1);
  });

  it('should show RoleContainer for /admin/stillinger route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/stillinger']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(RoleContainer);
    expect(component).toHaveLength(1);
  });

  it('should show GroupContainer for /admin/grupper route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/grupper']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(GroupContainer);
    expect(component).toHaveLength(1);
  });

  it('should show OptionContainer for /admin/innstillinger route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/innstillinger']}>
          <Admin />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(Admin);
    component = container.find(OptionContainer);
    expect(component).toHaveLength(1);
  });
});
