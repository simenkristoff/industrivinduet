import { mount } from 'enzyme';
import React from 'react';
import { Breadcrumb } from 'antd';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { BreadcrumbItemProps } from 'antd/lib/breadcrumb';

import { BreadcrumbContainer } from '@/containers/BreadcrumbContainer';

describe('container <BreadcrumbContainer />', () => {
  let wrapper: any, container: any, component: any;

  it('should render both container and component', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/arrangementer']}>
        <BreadcrumbContainer />
      </MemoryRouter>,
    );
    container = wrapper.find(BreadcrumbContainer);
    component = wrapper.find(Breadcrumb);
    wrapper.unmount();
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('should split path at /', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/arrangementer/123']}>
        <BreadcrumbContainer />
      </MemoryRouter>,
    );
    const _b = wrapper.find(Breadcrumb.Item);
    expect(_b.length).toBe(3);
    wrapper.unmount();
  });

  it('should not render at base url', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <BreadcrumbContainer />
      </MemoryRouter>,
    );
    const _b = wrapper.find(Breadcrumb.Item);
    expect(_b.length).toBe(0);
    wrapper.unmount();
  });

  it('should not render at /admin', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/admin']}>
        <BreadcrumbContainer />
      </MemoryRouter>,
    );
    const _b = wrapper.find(Breadcrumb.Item);
    expect(_b.length).toBe(0);
    wrapper.unmount();
  });

  it('should capitalize breadcrumbs', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/arrangementer/test']}>
        <BreadcrumbContainer />
      </MemoryRouter>,
    );
    const _b: any = wrapper.find(Breadcrumb.Item);
    const _expectedValues = ['Hjem', 'Arrangementer', 'Test'];
    _b.forEach((el: any, index: number) => {
      expect(el.html()).toContain(_expectedValues[index]);
    });
    wrapper.unmount();
  });
});
