import { Result } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';

import { ApiResponse } from '@/state/interface';

import { ErrorResponse } from '../ErrorResponse';

const errorMsg: ApiResponse = {
  status: 'error',
  message: 'An error occured',
};

const successMsg: ApiResponse = {
  status: 'success',
  message: 'Successful!',
};

describe('component <ErrorResponse />', () => {
  let wrapper: any, component: any;

  it('should not render error response', () => {
    wrapper = shallow(<ErrorResponse response={successMsg} />);
    component = wrapper.find(Result);
    expect(component.length).not.toBeTruthy();
  });

  it('should render error response with jumbotron', () => {
    wrapper = shallow(<ErrorResponse response={errorMsg} />);
    component = wrapper.find('span');
    expect(component.length).toBeTruthy();
    expect(component.text().trim()).toBe(errorMsg.message);
  });

  it('should render error response with jumbotron', () => {
    wrapper = shallow(<ErrorResponse response={errorMsg} jumbotron />);
    component = wrapper.find(Result);
    expect(component.length).toBeTruthy();
  });
});
