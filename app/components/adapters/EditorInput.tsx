import React, { useEffect } from 'react';
import { Editor, IAllProps as EditorFieldProps } from '@tinymce/tinymce-react';

let editorConfig: EditorFieldProps = {
  apiKey: 'zu41a2730rcj7g0nhdmfsduyhu9d987ap1cripcst31ougmt',
  outputFormat: 'html',
  init: {
    language: 'nb_NO',
    menubar: false,
    statusbar: false,
    toolbar:
      'styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
    height: '200px',
  },
};

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  config?: EditorFieldProps;
}

export const EditorInput: React.FC<IProps> = ({ value = '', onChange, config }: IProps) => {
  useEffect(() => {
    if (config) {
      editorConfig = { ...editorConfig, ...config };
    }
  }, []);

  const triggerChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleEditorChange = (a: string, editor: any) => {
    triggerChange(a);
  };

  return (
    <Editor initialValue={value.toString()} onEditorChange={handleEditorChange} {...editorConfig} />
  );
};
