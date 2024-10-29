import React, { useEffect, useState } from 'react';
import CustomBreadcrumb from '/@/components/CommonBreadcrumb';
import { Space } from 'antd';
import { useChangeLang } from '/@/hooks';
import CommonTable from '/@/components/CommonTable';

const Test = () => {
  const { t } = useChangeLang();
  const [dataSource, setDataSource] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(50);

  const data = Array.from({ length: total }, (_, index) => ({
    key: index,
    name: 'test',
    age: index,
    address: 'test',
  }));

  useEffect(() => {
    setDataSource(data);
  }, []);

  const test = () => {
    console.log(123);
  };

  const onChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setCurrent(current);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={test} style={{ color: 'blue' }}>
            Invite {record.name}
          </a>
          <a onClick={test} style={{ color: 'blue' }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomBreadcrumb arr={[t('table.editableTable.menu'), t('table.editableTable.subMenu')]} />
      <CommonTable
        data={dataSource}
        columns={columns}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
      />
    </>
  );
};

export default Test;
