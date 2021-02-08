import React from 'react';
import { Col, Image, Tooltip } from 'antd';
import { PartnerEntity } from '@/state/ducks/partner/types';
import { ColProps } from 'antd/lib/col';

interface IProps {
  data: PartnerEntity;
  column?: ColProps;
  render?: 'image' | 'withContent';
}

function renderImageOnly(data: PartnerEntity) {
  const { name, image, link, description } = data;

  return (
    <a href={link}>
      <Tooltip title={name}>
        <Image src={image} alt={name} preview={false} />
      </Tooltip>
    </a>
  );
}

function renderWithContents(data: PartnerEntity) {
  const { name, image, link, description } = data;

  return [
    <Image key={`${name}-logo`} src={image} alt={name} className='partner-logo' preview={false} />,
    <h4 key={`${name}-title`} className='partner-name'>
      {name}
    </h4>,
    <div
      key={`${name}-description`}
      className='description'
      dangerouslySetInnerHTML={{ __html: description }}
    />,
    <a key={`${name}-link`} href={link}>{`Les mer om ${name}`}</a>,
  ];
}

export const PartnerCard: React.FC<IProps> = ({ data, column, render }: IProps) => {
  return (
    <Col span={24} className='partner-card' {...column}>
      {render === 'image' ? renderImageOnly(data) : renderWithContents(data)}
    </Col>
  );
};

PartnerCard.defaultProps = {
  render: 'image',
  column: {
    span: 24,
  },
};
