import React from 'react';
import { Col, Form, Input, Select } from 'antd';

const renderCmp = (item:any) => {
  let cmp = null
  switch (item.type) {
    case 'Input':
      cmp = <Input {...item.props}/>;
      break;
    case 'Select':
      cmp = <Select {...item.props}></Select>
    default:
      break;
  }
  return cmp
}

const useFormItem = (items: any[]) => {
  return items.map((item) => {
    return (
      <Col span={8}>
        <Form.Item {...item}>
          {renderCmp(item)}
        </Form.Item>
      </Col>
    );
  });
};

export default useFormItem;
