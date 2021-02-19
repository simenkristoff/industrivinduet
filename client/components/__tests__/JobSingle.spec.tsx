import { shallow } from 'enzyme';
import React from 'react';
import { Col, Descriptions } from 'antd';

import jobData from '@/__mocks__/jobData';

import { JobSingle } from '../JobSingle';
import { Spinner } from '../Spinner';

const props = {
  data: jobData[0],
  loading: false,
};
describe('component <JobSingle />', () => {
  let wrapper: any;

  it('should render job single page', () => {
    wrapper = shallow(<JobSingle {...props} />);
    const spinner = wrapper.find(Spinner);
    const component = wrapper.find('.job-single');
    expect(spinner.length).not.toBeTruthy();
    expect(component.length).toBeTruthy();

    // Header
    const header = component.find('.header');
    expect(header.length).toBeTruthy();
    expect(header.find(Col).length).toBe(3);

    // Info section
    const infoSec = component.find('.info-section');
    expect(infoSec.length).toBeTruthy();
    expect(infoSec.find(Descriptions.Item).length).toBeTruthy();

    // Context
    const context = component.find('.context');
    expect(context.length).toBeTruthy();
    expect(context.find('.content').length).toBeTruthy();

    // Sider
    const sider = component.find('.sider');
    expect(sider.length).toBeTruthy();
    expect(sider.find(Descriptions.Item).length).toBeTruthy();
  });

  it('should not render when loading', () => {
    wrapper = shallow(<JobSingle {...props} loading={true} />);
    const spinner = wrapper.find(Spinner);
    const component = wrapper.find('.job-single');
    expect(spinner.length).toBeTruthy();
    expect(component.length).not.toBeTruthy();
  });
});
