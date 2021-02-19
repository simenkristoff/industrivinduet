import { Input, Result } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { ApiResponse } from '@/state/interface';

import { SearchInput } from '../SearchInput';

const props = {
  name: 'test-search',
  placeholder: 'search',
  onChange: jest.fn(),
};

describe('component <SearchInput />', () => {
  let wrapper: any, component: any;

  it('should render search input', () => {
    wrapper = shallow(<SearchInput {...props} />);
    component = wrapper.find(Input);
    expect(component.length).toBeTruthy();
    expect(component.at(0).props().name === 'test-search').toBeTruthy();
    expect(component.at(0).props().placeholder === 'search').toBeTruthy();
  });
});
