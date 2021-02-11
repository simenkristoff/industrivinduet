import React from 'react';
import { Layout, Row, Col, Empty } from 'antd';
import { Entity, ResultContentInterface, ResultItemInterface } from '@/types';

const { Content } = Layout;

function renderResults<T extends Entity>(data: T[], dataItem: React.FC<ResultItemInterface<T>>) {
  if (data.length > 0) {
    const DataItem = dataItem;

    return data.map((item) => <DataItem key={item._id} data={item} />);
  }

  return <Empty description='Ingen resultater' />;
}

export const ResultContent = <T extends Entity>(props: ResultContentInterface<T>): JSX.Element => {
  const { data, dataItem } = props;

  return (
    <Content>
      <Row>
        <Col className='results'>
          <div className='result-content'>
            <Row gutter={[16, 16]}>{renderResults(data, dataItem)}</Row>
          </div>
        </Col>
      </Row>
    </Content>
  );
};
