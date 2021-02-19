import { shallow } from 'enzyme';
import React from 'react';
import { Descriptions, Image } from 'antd';

import memberData from '@/__mocks__/memberData';

import { MemberCard } from '../MemberCard';

const props = {
  data: memberData[0],
};
describe('component <MemberCard />', () => {
  let wrapper: any;

  it('should render member card', () => {
    wrapper = shallow(<MemberCard {...props} />);
    const component = wrapper.find('.member-card');
    expect(component.length).toBeTruthy();
    expect(component.find(Image).length).not.toBeTruthy();
    expect(component.find('.member-name').at(0).text()).toBe(
      `${props.data.name.first} ${props.data.name.last}`,
    );
    expect(component.find('.member-details li').length).toBeTruthy();
  });

  it('should render member card with image', () => {
    wrapper = shallow(<MemberCard {...props} displayImage />);
    const component = wrapper.find('.member-card');
    expect(component.length).toBeTruthy();
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('.member-name').at(0).text()).toBe(
      `${props.data.name.first} ${props.data.name.last}`,
    );
    expect(component.find('.member-details li').length).toBeTruthy();
  });
});
