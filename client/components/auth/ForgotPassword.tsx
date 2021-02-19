import React from 'react';
import { Row, Col, Card } from 'antd';

import { ForgotPasswordCredentials, ApiResponse } from '@/types';
import { ErrorResponse } from '@/components/ErrorResponse';
import { SuccessResponse } from '@/components/SuccessResponse';
import { ForgotPasswordForm } from '@/components/forms/auth';
import { Spinner } from '@/components/Spinner';

export interface IProps {
  forgot: (credentials: ForgotPasswordCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

/**
 * Forgot Password component. Receives props from ForgotPasswordContainer
 * and displays the ForgotPasswordForm
 */
export const ForgotPassword: React.FC<IProps> = ({ forgot, loading, response }: IProps) => {
  return (
    <Row justify='center' align='middle' className='pt-2 pb-2'>
      <Col md={12} span={24} className='shadow-box-light'>
        <Card title={<h3>Tilbakestill passord</h3>}>
          <SuccessResponse response={response} />
          <ErrorResponse response={response} />
          <Spinner loading={loading} />
          <ForgotPasswordForm forgot={forgot} />
        </Card>
      </Col>
    </Row>
  );
};
