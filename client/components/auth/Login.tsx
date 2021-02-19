import React from 'react';
import { Row, Col, Card } from 'antd';

import { LoginCredentials, ApiResponse } from '@/types';
import { ErrorResponse } from '@/components/ErrorResponse';
import { LoginForm } from '@/components/forms/auth';
import { Spinner } from '@/components/Spinner';

export interface IProps {
  login: (credentials: LoginCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

/**
 * Login component. Receives props from LoginContainer
 * and displays the LoginForm
 */
export const Login: React.FC<IProps> = ({ login, loading, response }: IProps) => {
  return (
    <Row justify='center' align='middle' className='pt-2 pb-2'>
      <Col md={12} span={24}>
        <Card title={<h3>Logg inn</h3>} className='shadow-box-light'>
          <ErrorResponse response={response} />
          <Spinner loading={loading} />
          <LoginForm login={login} />
        </Card>
      </Col>
    </Row>
  );
};
