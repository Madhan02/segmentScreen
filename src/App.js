import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SegmentModal from './SegmentModal';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal}>
        Save Segment
      </Button>

      {/* Segment Modal */}
      <Modal
        title="Save Segment"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <SegmentModal handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}

export default App;
