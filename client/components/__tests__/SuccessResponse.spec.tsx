import { Result } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { ApiResponse } from '@/state/interface';

import { SuccessResponse } from '../SuccessResponse';

const errorMsg: ApiResponse = {
  status: 'error',
  message: 'An error occured',
};

const successMsg: ApiResponse = {
  status: 'success',
  message: 'Successful!',
};

describe('component <SuccessResponse />', () => {
  let wrapper: any, component: any;

  it('should not render success response', () => {
    wrapper = shallow(<SuccessResponse response={errorMsg} />);
    component = wrapper.find(Result);
    expect(component.length).not.toBeTruthy();
  });

  it('should render success response', () => {
    wrapper = shallow(<SuccessResponse response={successMsg} />);
    component = wrapper.find(Result);
    expect(component.length).toBeTruthy();
  });
});
