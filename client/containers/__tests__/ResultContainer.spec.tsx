import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { ResultContainer } from '@/containers/ResultContainer';
import { ResultManager } from '@/components/ResultManager';
import configureStore from '@/state/configureStore.dev';
import { EventEntity } from '@/state/interface';
import { grades } from '@/constants';
import { EventCard } from '@/components/EventCard';
import { FilterTypeInterface } from '@/utils/interface';

const data = require('./__mockData__/events.json');

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const { Provider } = reactRedux;

const filterTypes: FilterTypeInterface<EventEntity> = {
  grades: {
    type: 'checkbox',
    dependency: grades,
    label: 'Klassetrinn',
    postfix: '. trinn',
  },
};

const props = {
  title: 'Arrangementer',
  data,
  dataItem: EventCard,
  loading: false,
  filterTypes,
};

describe('container <ResultContainer /> as USER', () => {
  let wrapper: any, store: any, container: any, component: any;
  console.log(props);
  beforeEach(() => {
    store = configureStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/arrangementer']}>
          <ResultContainer<EventEntity> {...props} />
        </MemoryRouter>
      </Provider>,
    );
    container = wrapper.find(ResultContainer);
    component = container.find(ResultManager);
    wrapper.unmount();
  });

  it('should render both container and component', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should map state to props', () => {
    const expectedPropKeys = [
      'title',
      'originalSize',
      'data',
      'dataItem',
      'loading',
      'filterTypes',
    ];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it('should map dispatch to props', () => {
    const expectedPropKeys = ['onSearchFilterChange', 'onFilterChange', 'onFilterReset'];

    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });
});
