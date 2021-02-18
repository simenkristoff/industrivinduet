import { shallow } from 'enzyme';
import React from 'react';
import * as reactRedux from 'react-redux';
import { Tabs } from 'antd';

import { ForgotPasswordContainer } from '@/containers/auth/ForgotPasswordContainer';
import { AboutUs } from '@/components/AboutUs';
import configureStore from '@/state/configureStore';
import { ContentEntity, PartnerEntity } from '@/types';
import { MemberEntity } from '@/state/interface';

const initialState = (window as any).initialReduxState;
const spy = jest.spyOn(reactRedux, 'useDispatch');

const data: ContentEntity[] = [
  {
    _id: 'content1',
    title: 'Testpage',
    displayTitle: true,
    linkText: 'Testlink',
    content: 'Test test',
    priority: 1,
  },
];

const partners: PartnerEntity[] = [
  {
    _id: 'company1',
    name: 'Testcomp',
    image: 'http://testcomp.no/img.png',
    description: 'Test company',
    link: 'https://testcomp.no',
  },
];

const members: MemberEntity[] = [
  {
    _id: 'member1',
    name: {
      first: 'Simen',
      last: 'Kristoffersen',
    },
    role: null,
    email: 'simen.kristoffersen98@gmail.com',
    phone: '90360922',
    image:
      'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg',
  },
];

const props = {
  data,
  partners,
  members,
  loading: false,
};

const { Provider } = reactRedux;
describe('component <AboutUs />', () => {
  let wrapper: any, store: any, container: any, component: any;
  beforeEach(() => {
    wrapper = shallow(<AboutUs {...props} />);
  });

  it('should render tabs', () => {
    const tabs = wrapper.find(Tabs.TabPane);
    expect(tabs.length).toBe(3);
  });
});
