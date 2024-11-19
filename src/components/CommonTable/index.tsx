import { Table } from 'antd';
import React from 'react';

type Props = {
  data: any[];
  columns: any[];
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
  onChange: (pagination: { current: number; pageSize: number }) => void;
};

function CommonTable(props: Props) {
  const { data, columns, current, pageSize, total, loading, onChange } = props;  

  const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    onChange(pagination);
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        current,
        pageSize,
        total,
        onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
      }}
    />
  );
}

export default CommonTable;
