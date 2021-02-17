import React from 'react';
import { Tooltip, Image, Col } from 'antd';

import { MemberEntity } from '@/types';
import Profile from '@resources/profile_default.png';

interface IProps {
  data?: MemberEntity;
  className?: string;
  borderShadow?: boolean;
  displayImage?: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

/**
 * Renders a single Member with shortened details
 */
export const MemberCard: React.FC<IProps> = ({
  data,
  className,
  borderShadow,
  displayImage,
}: IProps) => {
  if (!data) return <Col lg={6} md={8} span={24} className='member-card-wrapper'></Col>;
  const { name, email, phone, image, role } = data;
  const roleType = role?.roleType;
  const groupName = role?.group?.name;

  return (
    <Col
      lg={6}
      md={8}
      span={24}
      className={`member-card-wrapper ${displayImage && 'has-image'} ${className}`}
    >
      <div className={`member-card ${borderShadow && 'shadow-box-light'}`}>
        <div className='card-header'>
          {displayImage && (
            <Image
              className='member-profile'
              alt={`${name.first} ${name.last}`}
              src={`${BACKEND_URL}/media/${image}`}
              fallback={Profile}
              preview={false}
            />
          )}
        </div>
        <div className='card-body'>
          <h5 className='member-name'>
            {name.first}&nbsp;{name.last}
          </h5>
          <ul className='member-details'>
            <li>{role?.name}</li>
            <li>
              <a href={`mailto: ${email}`}>
                <Tooltip title={email}>E-post</Tooltip>
              </a>
            </li>
            {phone && (
              <li>
                <a href={`tel: ${phone}`}>{phone}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};

MemberCard.defaultProps = {
  borderShadow: true,
  displayImage: false,
};
