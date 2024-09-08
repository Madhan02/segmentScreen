import React, { useState } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const { Option } = Select;

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const SegmentModal = ({ handleCancel }) => {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    if (selectedSchema && !schemas.some(s => s.value === selectedSchema)) {
      const selectedLabel = schemaOptions.find(s => s.value === selectedSchema).label;
      setSchemas([...schemas, { value: selectedSchema, label: selectedLabel }]);
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({ [schema.value]: schema.label }))
    };

    // Send data to server
    fetch('https://webhook.site/5be02fa0-a1e7-4406-8632-e10cfc5ad5a2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(segmentData),
      mode: 'no-cors'
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));

    handleCancel(); // Close the modal
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Segment Name">
          <Input
            value={segmentName}
            onChange={e => setSegmentName(e.target.value)}
            placeholder="Enter segment name"
          />
        </Form.Item>

        <Form.Item label="Add Schema to Segment">
          <Select
            value={selectedSchema}
            onChange={setSelectedSchema}
            placeholder="Select schema"
          >
            {schemaOptions
              .filter(option => !schemas.some(schema => schema.value === option.value))
              .map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
          </Select>
          <Button type="link" onClick={handleAddSchema}>
            + Add new schema
          </Button>
        </Form.Item>

        {/* Render selected schemas */}
        <div style={{ padding: '10px', backgroundColor: '#87CEEB', borderRadius: '5px' }}>
          {schemas.map(schema => (
            <Space key={schema.value} direction="horizontal" style={{ display: 'flex', marginBottom: '5px' }}>
              <Select
                value={schema.value}
                onChange={value => {
                  setSchemas(schemas.map(s => (s.value === schema.value ? { ...s, value } : s)));
                }}
              >
                {schemaOptions
                  .filter(option => !schemas.some(s => s.value === option.value))
                  .map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </Space>
          ))}
        </div>

        <Button type="primary" onClick={handleSaveSegment} style={{ margin: '5px' }}>
          Save Segment
        </Button>
      </Form>
    </div>
  );
};

export default SegmentModal;
