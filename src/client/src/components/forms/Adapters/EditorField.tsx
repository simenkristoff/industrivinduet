import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Editor } from '@tinymce/tinymce-react';

interface IProps extends FieldRenderProps<any, HTMLElement> {
  label?: string;
  height?: string;
}

const EditorField: React.FC<IProps> = ({ input, meta, ...props }: IProps) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className='form-group'>
      {props.label && (
        <label className='col-form-label' htmlFor={input.name}>
          {props.label}
        </label>
      )}
      <Editor
        tagName={input.name}
        initialValue={meta.initial}
        apiKey='zu41a2730rcj7g0nhdmfsduyhu9d987ap1cripcst31ougmt'
        onEditorChange={(event) => input.onChange(event)}
        onBlur={(event) => input.onBlur()}
        onFocus={(event) => input.onFocus()}
        outputFormat='html'
        init={{
          language: 'nb_NO',
          height: props.height,
        }}
      />
      {hasError && <small className='form-error text-danger'>{meta.error}</small>}
    </div>
  );
};

EditorField.defaultProps = {
  height: '32rem',
};

export default EditorField;
