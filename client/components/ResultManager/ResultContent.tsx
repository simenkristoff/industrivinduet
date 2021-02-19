import React from 'react';
import { Layout, Row, Col, Empty } from 'antd';

import { Entity, ResultContentInterface, ResultItemInterface } from '@/types';
import { Spinner } from '@/components/Spinner';

const { Content } = Layout;

/**
 * Renders the results
 */
function renderResults<T extends Entity>(data: T[], dataItem: React.FC<ResultItemInterface<T>>) {
  if (data.length > 0) {
    const DataItem = dataItem;

    return data.map((item) => <DataItem key={item._id} data={item} />);
  }

  return <Empty description='Ingen resultater' />;
}

export const ResultContent = <T extends Entity>(props: ResultContentInterface<T>): JSX.Element => {
  const { data, dataItem, loading } = props;

  const renderContent = () => {
    if (loading) {
      return <Spinner loading centered className='pt-5' />;
    }

    return <Row gutter={[16, 16]}>{renderResults(data, dataItem)}</Row>;
  };

  return (
    <Content>
      <Row>
        <Col className='results'>
          <div className='result-content'>{renderContent()}</div>
        </Col>
      </Row>
    </Content>
  );
};
