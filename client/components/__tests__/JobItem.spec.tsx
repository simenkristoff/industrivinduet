import { shallow } from 'enzyme';
import React from 'react';
import { Descriptions } from 'antd';

import jobData from '@/__mocks__/jobData';

import { JobItem } from '../JobItem';

const props = {
  data: jobData[0],
};
describe('component <JobItem />', () => {
  let wrapper: any;

  it('should render job item', () => {
    wrapper = shallow(<JobItem {...props} />);
    const component = wrapper.find('.job-item');
    expect(component.length).toBeTruthy();
    expect(component.props().href === `/stillingsannonser/${props.data._id}`);
    expect(component.find('.job-image img').length).toBeTruthy();
    expect(component.find(Descriptions.Item).length).toBe(2);
  });

  it('should not render descriptions', () => {
    wrapper = shallow(<JobItem {...props} displayContent={false} />);
    const component = wrapper.find('.job-item');
    expect(component.length).toBeTruthy();
    expect(component.find('.job-image img').length).toBeTruthy();
    expect(component.find(Descriptions.Item).length).not.toBeTruthy();
  });
});
