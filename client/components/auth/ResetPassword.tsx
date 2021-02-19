import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

import { ResetPasswordCredentials, ApiResponse } from '@/types';
import { ErrorResponse } from '@/components/ErrorResponse';
import { SuccessResponse } from '@/components/SuccessResponse';
import { ResetPasswordForm } from '@/components/forms/auth';
import { Spinner } from '@/components/Spinner';

export interface IProps {
  reset: (credentials: ResetPasswordCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
  token: string;
}

/**
 * Reset Password component. Receives props from ResetPasswordContainer
 * and displays the Reset PasswordForm
 */
export const ResetPassword: React.FC<IProps> = ({ reset, loading, response, token }: IProps) => {
  return (
    <Row justify='center' align='middle' className='pt-2 pb-2'>
      <Col md={12} span={24} className='shadow-box-light'>
        <Card title={<h3>Tilbakestill passord</h3>}>
          <SuccessResponse
            response={response}
            extra={
              <Link to='/logg_inn'>
                <Button type='primary'>Logg inn</Button>
              </Link>
            }
          />
          <ErrorResponse jumbotron response={response} />
          <Spinner loading={loading} />
          <ResetPasswordForm reset={reset} token={token} />
        </Card>
      </Col>
    </Row>
  );
};
