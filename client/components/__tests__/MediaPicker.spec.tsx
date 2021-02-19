import { Input } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { MediaContainer } from '@/containers/MediaContainer';

import { MediaPicker } from '../MediaPicker';

describe('component <MediaPicker />', () => {
  let component: any;

  it('should render media picker', () => {
    component = shallow(<MediaPicker />);
    expect(component.length).toBeTruthy();
    expect(component.find(MediaContainer).length).toBeTruthy();
    expect(component.find(Input).length).toBeTruthy();
  });
});
