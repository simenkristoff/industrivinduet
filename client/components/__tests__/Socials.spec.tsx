import { mount } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';

import { SocialOptions } from '@/state/interface';

import { Socials } from '../Socials';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const socialLinkRef = [
  'https://www.facebook.com/industrivinduet/',
  'https://www.instagram.com/industrivinduet/',
  'https://www.linkedin.com/company/industrivinduet-ntnu',
];

const socials: SocialOptions = {
  facebook: {
    name: 'Industrivinduet',
    link: 'https://www.facebook.com/industrivinduet/',
  },
  instagram: {
    name: 'Industrivinduet',
    link: 'https://www.instagram.com/industrivinduet/',
  },
  linkedin: {
    name: 'Industrivinduet, NTNU',
    link: 'https://www.linkedin.com/company/industrivinduet-ntnu',
  },
};

const props = {
  socials,
};

const { Provider } = reactRedux;
describe('component <Socials />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    wrapper = mount(<Socials {...props} />);
  });

  it('should render socials', () => {
    const socialLinks = wrapper.find('ul > li');
    expect(socialLinks.length).toBe(3);
  });

  it('should render link and icon for each social', () => {
    const socialLinks: Array<any> = wrapper.find('ul > li');
    socialLinks.forEach((social, index) => {
      const link = social.find('a');
      const icon = link.find('svg');
      const isValid: boolean =
        link.length > 0 && icon.length > 0 && link.at(0).props().href === socialLinkRef[index];
      expect(isValid).toBeTruthy();
    });
  });
});
