import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { JobResultContainer } from '@/containers/JobResultContainer';
import { ResultContainer } from '@/containers/ResultContainer';
import configureStore from '@/state/configureStore.dev';
import { JobActionTypes, StudyFieldActionTypes } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

describe('container <JobResultContainer />', () => {
  let wrapper, store: any, container, component: any;
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <JobResultContainer />
      </Provider>,
    );
    container = wrapper.find(JobResultContainer);
    component = container.find(ResultContainer);
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = [
      'title',
      'data',
      'dataItem',
      'loading',
      'filterTypes',
      'searchFilterTypes',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should fetch data on mount', () => {
    const actions = store.dispatch.mock.calls;
    expect(actions.length).toBe(2);

    expect(actions[0][0]['type']).toBe(StudyFieldActionTypes.FETCH.START);
    expect(actions[1][0]['type']).toBe(JobActionTypes.FETCH.START);
  });
});
