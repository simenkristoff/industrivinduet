import { shallow } from 'enzyme';
import React from 'react';
import { Image } from 'antd';

import partnerData from '@/__mocks__/partnerData';

import { PartnerCard } from '../PartnerCard';

const props = {
  data: partnerData[0],
};
describe('component <PartnerCard />', () => {
  let wrapper: any;

  it('should render partner card with only image', () => {
    wrapper = shallow(<PartnerCard {...props} />);
    const component = wrapper.find('.partner-card');
    expect(component.length).toBeTruthy();
    expect(component.props().href === `${props.data.link}`);
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('.description').length).not.toBeTruthy();
  });

  it('should render the whole partner card', () => {
    wrapper = shallow(<PartnerCard {...props} render='withContent' />);
    const component = wrapper.find('.partner-card');
    expect(component.length).toBeTruthy();
    expect(component.props().href === `${props.data.link}`);
    expect(component.find(Image).length).toBeTruthy();
    expect(component.find('.description').length).toBeTruthy();
  });
});
