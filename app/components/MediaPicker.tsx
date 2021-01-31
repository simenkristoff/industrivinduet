import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import MediaContainer from '@/containers/MediaContainer';
const MediaPicker: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button onClick={handleModal}>Click me</Button>
      <Modal visible={visible} onCancel={handleModal}>
        <MediaContainer />
      </Modal>
    </>
  );
};

export default MediaPicker;
