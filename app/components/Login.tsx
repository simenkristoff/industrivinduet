import React from 'react';
import { Row, Col, Card } from 'antd';
import { LoginCredentials } from '@/state/ducks/auth/types';
import { Error } from '@/components/Error';

import { LoginForm } from './forms';

export interface IProps {
  login: (credentials: LoginCredentials) => void;
  errors: Array<String>;
}

export const Login: React.FC<IProps> = ({ login, errors }: IProps) => {
  return (
    <Row justify='center' align='middle'>
      <Col md={12} span={24}>
        <Card title={<h3>Logg inn</h3>}>
          <Error align='center' errors={errors!} />
          <LoginForm login={login} />
        </Card>
      </Col>
    </Row>
  );
};
