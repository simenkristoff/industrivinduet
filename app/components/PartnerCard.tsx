import React from 'react';
import { Col, Image, Tooltip } from 'antd';
import { PartnerEntity } from '@/state/ducks/partner/types';
import { ColProps } from 'antd/lib/col';

interface IProps {
  data: PartnerEntity;
  column?: ColProps;
}

export const PartnerCard: React.FC<IProps> = ({ data, column }: IProps) => {
  const { name, image, link, description } = data;

  return (
    <Col {...column}>
      <a href={link}>
        <Tooltip title={name}>
          <Image src={image} alt={name} preview={false} />
        </Tooltip>
      </a>
    </Col>
  );
};

PartnerCard.defaultProps = {
  column: {
    span: 24,
  },
};
