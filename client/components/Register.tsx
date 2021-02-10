import React from 'react';
import { Row, Col, Card } from 'antd';
import { RegisterCredentials } from '@/types';

import { Error } from '@/components/Error';
import { RegisterForm } from '@/components/forms';

export interface IProps {
  register: (credentials: RegisterCredentials) => void;
  errors: Array<String>;
}

export const Register: React.FC<IProps> = ({ register, errors }: IProps) => {
  return (
    <Row justify='center' align='middle'>
      <Col md={12} span={24}>
        <Card title={<h3>Registrer</h3>}>
          <Error align='center' errors={errors!} />
          <RegisterForm register={register} />
        </Card>
      </Col>
    </Row>
  );
};
