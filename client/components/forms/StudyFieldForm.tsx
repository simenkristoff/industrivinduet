import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import { StudyFieldEntity } from '@/state/ducks/studyfield/types';
import { DataFormInterface, IApplicationState } from '@/types';
import { uniqueValue } from '@/utils/validation';
import { FormMessage } from '@/constants';
import { EditorInput } from '@/components/adapters';

export const StudyFieldForm: React.FC<DataFormInterface<StudyFieldEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<StudyFieldEntity>) => {
  const studyfields = useSelector(({ studyfield }: IApplicationState) => studyfield.data);

  return (
    <Form
      form={form}
      name='studyfield_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' />
      </Form.Item>

      <Form.Item
        name='name'
        label={FormMessage.STUDYFIELD.LABEL.NAME}
        rules={[
          { required: true, message: FormMessage.STUDYFIELD.REQUIRED.NAME },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                studyfields,
                ['name'],
                true,
                FormMessage.STUDYFIELD.UNIQUE.NAME,
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='abbr'
        label={FormMessage.ABBREVIATION.LABEL}
        rules={[
          { required: true, message: FormMessage.ABBREVIATION.REQUIRED },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                studyfields,
                ['abbr'],
                true,
                FormMessage.ABBREVIATION.UNIQUE,
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='link'
        label={FormMessage.LINK.LABEL}
        rules={[{ required: true, message: FormMessage.LINK.REQUIRED }, { type: 'url' }]}
      >
        <Input type='url' />
      </Form.Item>

      <Form.Item
        name='description'
        label={FormMessage.DESCRIPTION.LABEL.DEFAULT}
        rules={[{ required: true, message: FormMessage.DESCRIPTION.REQUIRED.DEFAULT }]}
      >
        <EditorInput />
      </Form.Item>
    </Form>
  );
};
