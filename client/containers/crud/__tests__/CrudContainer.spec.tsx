import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { Modal } from 'antd';

import { GroupContainer } from '@/containers/crud/GroupContainer';
import { CrudContainer } from '@/containers/crud/CrudContainer';
import configureStore from '@/state/configureStore.dev';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <CrudContainer />', () => {
  let wrapper: any, store: any, container: any, header: any, content: any, modal: any;
  beforeAll(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <GroupContainer />
      </Provider>,
    );
    container = wrapper.find(CrudContainer);
    header = container.find('.ant-page-header');
    content = container.find('.ant-table-wrapper');
    modal = wrapper.find(Modal);
  });
  afterAll(() => {
    wrapper.unmount();
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(header.length).toBeTruthy();
    expect(content.length).toBeTruthy();
    expect(modal.length).toBeTruthy();
  });
});
