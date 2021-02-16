import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { Modal } from 'antd';

import { MediaContainer } from '@/containers/MediaContainer';
import configureStore from '@/state/configureStore.dev';
import { MediaActionTypes, OptionActionTypes } from '@/state/interface';
import { MediaLibrary } from '@/components/MediaLibrary';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <MediaContainer />', () => {
  let wrapper, store: any, container, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MediaContainer />
      </Provider>,
    );
    container = wrapper.find(MediaContainer);
    component = container.find(MediaLibrary);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = ['fileData', 'path', 'inModal'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = [
      'fetchFiles',
      'uploadFile',
      'deleteFile',
      'createFolder',
      'updateFolder',
      'handleBackClick',
      'handleSelect',
      'handleFolderClick',
      'handleImageSelect',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(1);

    expect(actions[0][0]['type']).toBe(MediaActionTypes.FETCH.START);
  });
});
