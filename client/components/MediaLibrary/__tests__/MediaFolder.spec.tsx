import { Input } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { mediaFolderMock } from '@/__mocks__/mediaData';
import { MediaType } from '@/types';

import { MediaFolder } from '../MediaFolder';

const deleteFile = jest.fn();
const updateFolder = jest.fn();
const onSelect = jest.fn();
const onFolderClick = jest.fn();

const props = {
  data: mediaFolderMock,
  dirNames: ['profiler'],
  deleteFile,
  updateFolder,
  onSelect,
  onFolderClick,
};

describe('component <MediaFolder />', () => {
  let component: any, input: any;

  beforeAll(() => {
    component = shallow(<MediaFolder {...props} />);
  });

  it('should render media folder', () => {
    expect(component.length).toBeTruthy();
    expect(component.find('.media-folder').length).toBeTruthy();
    expect(component.find('.action-edit').length).toBeTruthy();
    expect(component.find('.action-delete').length).toBeTruthy();
    expect(component.find('.folder-wrapper').length).toBeTruthy();
    expect(component.find(Input).length).toBeTruthy();
  });
});
