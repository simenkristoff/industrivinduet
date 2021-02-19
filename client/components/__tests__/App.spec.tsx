import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '@/state/configureStore';
import App from '@/App';
import { FrontpageContainer } from '@/containers/FrontpageContainer';
import { EventResultContainer } from '@/containers/EventResultContainer';
import { EventSingleContainer } from '@/containers/EventSingleContainer';
import { JobResultContainer } from '@/containers/JobResultContainer';
import { JobSingleContainer } from '@/containers/JobSingleContainer';
import { AboutUsContainer } from '@/containers/AboutUsContainer';
import { ContactContainer } from '@/containers/ContactContainer';
import {
  ForgotPasswordContainer,
  LoginContainer,
  RegisterContainer,
  ResetPasswordContainer,
} from '@/containers/auth';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');
const { Provider } = reactRedux;

describe('component <App />', () => {
  let wrapper: any, container: any, component: any;
  const store = configureStore(initialState);
  store.dispatch = jest.fn();

  it('should show FrontpageContainer for / route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(FrontpageContainer);
    expect(component).toHaveLength(1);
  });

  it('should show EventResultContainer for /arrangementer route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(EventResultContainer);
    expect(component).toHaveLength(1);
  });

  it('should show EventSingleContainer for /arrangementer/:eventId route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer/1233']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(EventSingleContainer);
    expect(component).toHaveLength(1);
  });

  it('should show JobResultContainer for /stillingsannonser route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stillingsannonser']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(JobResultContainer);
    expect(component).toHaveLength(1);
  });

  it('should show JobSingleContainer for /stillingsannonser/:jobId route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stillingsannonser/1233']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(JobSingleContainer);
    expect(component).toHaveLength(1);
  });

  it('should show AboutUsContainer for /om_oss route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/om_oss']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(AboutUsContainer);
    expect(component).toHaveLength(1);
  });

  it('should show ContactContainer for /kontakt route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/kontakt']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(ContactContainer);
    expect(component).toHaveLength(1);
  });

  it('should show LoginContainer for /logg_inn route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/logg_inn']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(LoginContainer);
    expect(component).toHaveLength(1);
  });

  it('should show RegisterContainer for /registrer/:token route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/registrer/121d13123d']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(RegisterContainer);
    expect(component).toHaveLength(1);
  });

  it('should show ForgotPasswordContainer for /glemt_passord route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/glemt_passord']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(ForgotPasswordContainer);
    expect(component).toHaveLength(1);
  });

  it('should show ResetPasswordContainer for /tilbakestill/:token route', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tilbakestill/121d13123d']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(App);
    component = container.find(ResetPasswordContainer);
    expect(component).toHaveLength(1);
  });
});
