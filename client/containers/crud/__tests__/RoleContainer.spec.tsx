import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { RoleContainer } from '@/containers/crud/RoleContainer';
import { CrudContainer } from '@/containers/crud/CrudContainer';
import configureStore from '@/state/configureStore';
import { RoleActionTypes, GroupActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;
describe('container <RoleContainer />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <RoleContainer />
      </Provider>,
    );
    container = wrapper.find(RoleContainer);
    component = container.find(CrudContainer);
    wrapper.unmount();
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['state', 'columns', 'name', 'collection', 'dataForm'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['fetch', 'create', 'update', 'remove', 'set'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should fetch data on mount', () => {
    const actions: Array<any> = store.dispatch.mock.calls;
    expect(actions.length).toBeGreaterThan(0);
    expect(
      actions.some((action) => action[0]['type'] === RoleActionTypes.FETCH.START),
    ).toBeTruthy();
    expect(
      actions.some((action) => action[0]['type'] === GroupActionTypes.FETCH.START),
    ).toBeTruthy();
  });
});
