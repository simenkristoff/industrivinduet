import { shallow } from 'enzyme';
import React from 'react';
import { Descriptions } from 'antd';

import eventData from '@/__mocks__/eventData';

import { EventItem } from '../EventItem';

const props = {
  data: eventData[0],
};
describe('component <EventItem />', () => {
  let wrapper: any;

  it('should render event item', () => {
    wrapper = shallow(<EventItem {...props} />);
    const component = wrapper.find('.event-item');
    expect(component.length).toBeTruthy();
    expect(component.props().href === `/arrangementer/${props.data._id}`);
    expect(component.find('.event-image img').length).toBeTruthy();
    expect(component.find(Descriptions.Item).length).toBe(3);
  });

  it('should not render descriptions', () => {
    wrapper = shallow(<EventItem {...props} displayContent={false} />);
    const component = wrapper.find('.event-item');
    expect(component.length).toBeTruthy();
    expect(component.find('.event-image img').length).toBeTruthy();
    expect(component.find(Descriptions.Item).length).not.toBeTruthy();
  });
});
