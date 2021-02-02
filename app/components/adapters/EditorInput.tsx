import React, { useEffect } from 'react';
import { Editor, IAllProps as EditorFieldProps } from '@tinymce/tinymce-react';

let editorConfig: EditorFieldProps = {
  apiKey: 'zu41a2730rcj7g0nhdmfsduyhu9d987ap1cripcst31ougmt',
  outputFormat: 'html',
};

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  config?: EditorFieldProps;
  height?: number;
}

export const EditorInput: React.FC<IProps> = ({ value = '', onChange, config, height }: IProps) => {
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
    <Editor
      initialValue={value.toString()}
      onEditorChange={handleEditorChange}
      {...editorConfig}
      init={{
        language: 'nb_NO',
        plugins: ['image', 'autoresize'],
        menubar: false,
        statusbar: false,
        resize: true,
        toolbar:
          'styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
        min_height: height ? height : 200,
        autoresize_bottom_margin: 50,
        autoresize_on_init: true,
      }}
    />
  );
};
