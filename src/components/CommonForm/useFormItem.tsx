import React from 'react';
import { Col, Form, Input } from 'antd';

const renderCmp = (item:any) => {
  let cmp = null
  switch (item.type) {
    case 'Input':
      cmp = <Input placeholder="First Name" />;
      break;
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
