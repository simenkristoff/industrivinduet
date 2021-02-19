import { shallow } from 'enzyme';
import React from 'react';

import eventsData from '@/__mocks__/eventData';
import jobsData from '@/__mocks__/jobData';
import optionsData from '@/__mocks__/optionData';
import partnersData from '@/__mocks__/partnerData';

import { Frontpage } from '../Frontpage';
import { EventCard } from '../EventCard';
import { Spinner } from '../Spinner';
import { JobItem } from '../JobItem';
import { PartnerCard } from '../PartnerCard';

const props = {
  generalOptions: optionsData.general,
  events: {
    data: eventsData,
    display: true,
    loading: false,
    colSize: 3,
  },
  jobs: {
    data: jobsData,
    display: true,
    loading: false,
  },
  partners: {
    data: partnersData,
    loading: false,
  },
};

describe('component <Frontpage />', () => {
  let wrapper: any, component: any;

  it('should render frontpage', () => {
    component = shallow(<Frontpage {...props} />);
    expect(component.length).toBeTruthy();

    // Event section
    const events = component.find('.events');
    expect(events.length).toBeTruthy();
    const eventSpinner = events.find(Spinner);
    expect(eventSpinner.length).not.toBeTruthy();
    expect(events.find(EventCard).length).toBeTruthy();

    // Job section
    const jobs = component.find('.jobs');
    expect(jobs.length).toBeTruthy();
    const jobSpinner = events.find(Spinner);
    expect(jobSpinner.length).not.toBeTruthy();
    expect(jobs.find(JobItem).length).toBeTruthy();

    // Partner section
    const partners = component.find('.partners');
    expect(partners.length).toBeTruthy();
    const partnerSpinner = events.find(Spinner);
    expect(partnerSpinner.length).not.toBeTruthy();
    expect(partners.find(PartnerCard).length).toBeTruthy();

    // Contact section
    const contact = component.find('.contact');
    expect(contact.length).toBeTruthy();

    // Student org
    const studOrg = component.find('.student-organization');
    expect(studOrg.length).toBeTruthy();
  });

  it('should display spinner in event section', () => {
    const newEventProps = { ...props.events, loading: true };
    const newProps = { ...props, events: newEventProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const events = component.find('.events');
    expect(events.length).toBeTruthy();
    const eventSpinner = events.find(Spinner);
    expect(eventSpinner.length).toBeTruthy();
    expect(events.find(EventCard).length).not.toBeTruthy();
  });

  it('should not display event section', () => {
    const newEventProps = { ...props.events, display: false };
    const newProps = { ...props, events: newEventProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const events = component.find('.events');
    expect(events.length).not.toBeTruthy();
  });

  it('should display spinner in job section', () => {
    const newJobProps = { ...props.jobs, loading: true };
    const newProps = { ...props, jobs: newJobProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const jobs = component.find('.jobs');
    expect(jobs.length).toBeTruthy();
    const jobSpinner = jobs.find(Spinner);
    expect(jobSpinner.length).toBeTruthy();
    expect(jobs.find(JobItem).length).not.toBeTruthy();
  });

  it('should not display job section', () => {
    const newJobProps = { ...props.jobs, display: false };
    const newProps = { ...props, jobs: newJobProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const jobs = component.find('.jobs');
    expect(jobs.length).not.toBeTruthy();
  });

  it('should display spinner in partner section', () => {
    const newPartnerProps = { ...props.partners, loading: true };
    const newProps = { ...props, partners: newPartnerProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const partners = component.find('.partners');
    expect(partners.length).toBeTruthy();
    const partnerSpinner = partners.find(Spinner);
    expect(partnerSpinner.length).toBeTruthy();
    expect(partners.find(PartnerCard).length).not.toBeTruthy();
  });

  it('should not display partner section', () => {
    const newPartnerProps = { ...props.partners, data: [] };
    const newProps = { ...props, partners: newPartnerProps };
    component = shallow(<Frontpage {...newProps} />);
    expect(component.length).toBeTruthy();

    const partners = component.find('.partners');
    expect(partners.length).not.toBeTruthy();
  });
});
