import { Image, Input } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { mediaImageMock } from '@/__mocks__/mediaData';
import { MediaType } from '@/types';

import { MediaImage } from '../MediaImage';

const deleteFile = jest.fn();
const onSelect = jest.fn();
const onImageSelect = jest.fn();

const props = {
  data: mediaImageMock,
  inModal: false,
  deleteFile,
  onSelect,
  onImageSelect,
};

describe('component <MediaPicker />', () => {
  let component: any, input: any;

  it('should render media image', () => {
    component = shallow(<MediaImage {...props} />);
    expect(component.length).toBeTruthy();
    expect(component.find('.media-image').length).toBeTruthy();
    expect(component.find('.action-select').length).not.toBeTruthy();
    expect(component.find('.action-delete').length).toBeTruthy();
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('.image-details').length).toBeTruthy();
  });

  it('should render media image in modal', () => {
    component = shallow(<MediaImage {...props} inModal />);
    expect(component.length).toBeTruthy();
    expect(component.find('.media-image').length).toBeTruthy();
    expect(component.find('.action-select').length).toBeTruthy();
    expect(component.find('.action-delete').length).toBeTruthy();
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('.image-details').length).toBeTruthy();
  });
});
