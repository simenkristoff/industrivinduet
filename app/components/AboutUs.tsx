import React, { useEffect } from 'react';
import { Tabs, Row } from 'antd';
import { ContentEntity } from '@/state/ducks/content/types';
import { MemberEntity } from '@/state/ducks/member/types';

import { MemberCard } from './MemberCard';

const { TabPane } = Tabs;

interface IProps {
  data: ContentEntity[];
  members: MemberEntity[] | undefined;
  fetchContents: () => void;
  fetchMembers: () => void;
}

export const AboutUs: React.FC<IProps> = ({
  data,
  members,
  fetchContents,
  fetchMembers,
}: IProps) => {
  useEffect(() => {
    fetchContents();
    fetchMembers();
  }, []);
  const key = data.length > 0 ? data[0].linkText : '';

  return (
    <Tabs tabPosition='left' key={key}>
      {data.map((content, index) => (
        <TabPane tab={content.linkText} key={content.linkText}>
          {content.displayTitle && <h2>{content.title}</h2>}
          <div className='content' dangerouslySetInnerHTML={{ __html: content.content }} />
        </TabPane>
      ))}
      <TabPane tab='Medlemmer' key='members'>
        <Row gutter={[16, 16]}>
          {members?.map((member) => (
            <MemberCard key={member._id} data={member} displayImage />
          ))}
        </Row>
      </TabPane>
    </Tabs>
  );
};
