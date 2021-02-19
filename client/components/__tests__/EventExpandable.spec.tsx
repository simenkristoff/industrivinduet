import { shallow } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { Image } from 'antd';

import eventData from '@/__mocks__/eventData';

import { EventExpandable } from '../EventExpandable';

describe('component <EventExpandable />', () => {
  let wrapper: any;

  it('should not render event expandble', () => {
    wrapper = shallow(<EventExpandable {...eventData[0]} />);
    const component = wrapper.find('.table-col-expanded');
    expect(component.length).toBeTruthy();
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('dl .starttime').length).toBeTruthy();
    expect(component.find('dl .place').length).toBeTruthy();
    expect(component.find('dl .endtime').length).toBeTruthy();
    expect(component.find('dl .dining').length).toBeTruthy();
  });

  it('should not render endtime and dining', () => {
    const event = { ...eventData[0], endtime: undefined, dining: undefined };
    wrapper = shallow(<EventExpandable {...event} />);
    const component = wrapper.find('.table-col-expanded');
    expect(component.length).toBeTruthy();
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('dl .starttime').length).toBeTruthy();
    expect(component.find('dl .place').length).toBeTruthy();
    expect(component.find('dl .endtime').length).not.toBeTruthy();
    expect(component.find('dl .dining').length).not.toBeTruthy();
  });
});
