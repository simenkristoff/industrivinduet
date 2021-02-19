import { Spin } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { Spinner } from '../Spinner';

describe('component <Spinner />', () => {
  let wrapper: any, component: any;

  it('should not render spinner', () => {
    wrapper = shallow(<Spinner loading={false} />);
    component = wrapper.find(Spin);
    expect(component.length).not.toBeTruthy();
  });

  it('should render spinner', () => {
    wrapper = shallow(<Spinner loading={true} />);
    component = wrapper.find(Spin);
    expect(component.length).toBeTruthy();
  });
});
