import { Form, Row, Button, Space } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import useFormItem from './useFormItem';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
  items: any[];
  onFinish?: (values: any) => void;
  onReset?: () => void;
};

const CommonForm = forwardRef((props: Props, ref: any) => {
  const { items, onFinish, onReset } = props;
  const FormItemsDom = useFormItem(items);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form,
  }));

  return (
    <Form form={form} onFinish={onFinish} onReset={onReset}>
      <Row gutter={16}>{FormItemsDom}</Row>
      <Form.Item>
        <Space>
          <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
            查询
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
});

export default CommonForm;
