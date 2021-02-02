import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { EventEntity } from '@/state/ducks/event/types';
import { JobEntity } from '@/state/ducks/job/types';
import { MemberEntity } from '@/state/ducks/member/types';

import { EventItem } from './EventItem';
import { JobItem } from './JobItem';

interface IProps {
  memberCount: number;
  nonOccupied: MemberEntity[];
  leaders: MemberEntity[];
  roleCount: number;
  events: EventEntity[];
  jobs: JobEntity[];
  fetchMembers: () => void;
  fetchRoles: () => void;
  fetchEvents: () => void;
  fetchJobs: () => void;
}

export const AdminLanding: React.FC<IProps> = ({
  memberCount,
  nonOccupied,
  leaders,
  roleCount,
  events,
  jobs,
  fetchMembers,
  fetchRoles,
  fetchEvents,
  fetchJobs,
}: IProps) => {
  useEffect(() => {
    fetchMembers();
    fetchRoles();
    fetchEvents();
    fetchJobs();
  }, []);

  return (
    <div className='admin-landing'>
      <Row gutter={[16, 16]} align='stretch' justify='center'>
        <Col md={12} span={24}>
          <section className='jobs full-height'>
            <div className='section-header'>
              <h4 className='section-title'>Kommende stillingsannonser</h4>
            </div>
            <div className='section-content no-pad'>
              {jobs &&
                jobs.map((event) => (
                  <JobItem displayContent={false} margin={false} key={event._id} data={event} />
                ))}
            </div>
          </section>
        </Col>
        <Col md={12} span={24}>
          <section className='events full-height'>
            <div className='section-header'>
              <h4 className='section-title'>Kommende arrangementer</h4>
            </div>
            <div className='section-content no-pad'>
              {events &&
                events.map((event) => (
                  <EventItem displayContent={false} className='mb-0' key={event._id} data={event} />
                ))}
            </div>
          </section>
        </Col>
      </Row>
      <Row gutter={[16, 16]} align='stretch' justify='center'>
        {nonOccupied.length > 0 && (
          <Col md={12} span={24}>
            <section className='non_occupied-count full-height text-center'>
              <div className='section-header'>
                <h4 className='section-title'>Medlemmer uten stilling</h4>
              </div>
              <div className='section-content text-center'>
                <h2 className='pb-1 border-medium-bottom'>{nonOccupied.length}</h2>
                {nonOccupied.map((member) => {
                  return (
                    <div className='non_occupied-wrapper mb-1' key={member._id}>
                      <span>{`${member.name.first} ${member.name.last}`}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </Col>
        )}
        <Col md={12} span={24}>
          <section className='leaders full-height text-center'>
            <div className='section-header'>
              <h4 className='section-title'>Ledere</h4>
            </div>
            <div className='section-content'>
              {leaders.map((leader) => {
                const leaderType = leader.role?.group ? leader.role?.group?.name : 'Daglig leder';

                return (
                  <div className='leader-wrapper mb-1' key={leader._id}>
                    <h5 className='mb-0'>{leaderType}</h5>
                    <span>{`${leader.name.first} ${leader.name.last}`}</span>
                    <a style={{ display: 'block' }} href={`tel: ${leader.phone}`}>
                      {leader.phone}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </Col>
      </Row>
      <Row gutter={[16, 16]} align='stretch' justify='center'>
        <Col md={12} span={24}>
          <section className='member-count text-center'>
            <div className='section-header'>
              <h4 className='section-title'>Antall medlemmer</h4>
            </div>
            <div className='section-content'>
              <h2>{memberCount}</h2>
            </div>
          </section>
        </Col>
        <Col md={12} span={24}>
          <section className='role-count text-center'>
            <div className='section-header'>
              <h4 className='section-title'>Antall stillinger</h4>
            </div>
            <div className='section-content'>
              <h2>{roleCount}</h2>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
};
