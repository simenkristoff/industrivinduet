import React from 'react';
import _ from 'lodash';
import { Row, Col, Card } from 'antd';

import { RegisterCredentials, ApiResponse } from '@/types';
import { SuccessResponse } from '@/components/SuccessResponse';
import { ErrorResponse } from '@/components/ErrorResponse';
import { RegisterForm } from '@/components/forms/auth';
import { Spinner } from '@/components/Spinner';
import { UserEntity } from '@/state/interface';

export interface IProps {
  user: UserEntity | {};
  register: (credentials: RegisterCredentials) => void;
  loading: boolean;
  response: ApiResponse | null;
}

export const Register: React.FC<IProps> = ({ user, register, loading, response }: IProps) => {
  return (
    <Row justify='center' align='middle' className='pt-2 pb-2'>
      <Col md={12} span={24}>
        <Card title={<h3>Registrer</h3>} className='shadow-box-light'>
          <SuccessResponse response={response} />
          <ErrorResponse response={response} />
          <Spinner loading={loading} />
          {!_.isEmpty(user) && <RegisterForm user={user as UserEntity} register={register} />}
        </Card>
      </Col>
    </Row>
  );
};
