import React, { useEffect, useRef, useState } from 'react';
import CustomBreadcrumb from '/@/components/CommonBreadcrumb';
import { Space } from 'antd';
import { useChangeLang } from '/@/hooks';
import CommonTable from '/@/components/CommonTable';
import CommonForm from '/@/components/CommonForm';
import { reqGetAllVote } from '/@/services';
import dayjs from 'dayjs'

const Test = () => {
  const { t } = useChangeLang();
  const [dataSource, setDataSource] = useState<any>([]);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const data = Array.from({ length: total }, (_, index) => ({
    key: index,
    name: 'test',
    age: index,
    address: 'test',
  }));

  const getData = (data) => {
    reqGetAllVote(data).then(res => {
      const resData = res.data
      console.log(resData, 123);
      setDataSource(resData.records)
      setSize(resData.size)
      setTotal(resData.total)
      setCurrent(resData.current)
    }) 
  }

  useEffect(() => {
    const values = formRef.current.form.getFieldsValue(true)
    const data = {
      ...values,
      current,
      size
    }
    getData(data)
  }, []);

  const test = () => {
    console.log(123);
  };

  const onChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setCurrent(current);
    setSize(pageSize);
  };

  const columns = [
    {
      title: '活动标题',
      dataIndex: 'tittle',
      key: 'tittle',
    },
    {
      title: '活动介绍',
      dataIndex: 'intro',
      key: 'intro',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render:(value) => {
        return dayjs(value).format('YYYY-MM-DD')
      }
    },
    {
      title: '活动状态',
      dataIndex: 'state',
      key: 'state',
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

  const formItems = [
    {
      name: 'tittle',
      type: 'Input',
      label: '活动标题',
    },
    {
      name: 'state',
      type: 'Select',
      label: '活动状态',
      props: {
        allowClear: true,
        options:
          [
            {
              value: 'editing',
              label: '编辑中',
            },
            {
              value: 'pending',
              label: '审核中',
            },
            {
              value: 'approved',
              label: '通过',
            },
            {
              value: 'rejected',
              label: '拒绝',
            }
          ]
      }
    },
  ];

  const formRef = useRef(null);

  const onFinish = (values: any) => {
    const data = {
      ...values,
      current,
      size
    }
    getData(data)
  };

  const onReset = () => {
    const values = formRef.current.form.getFieldsValue(true)
    const data = {
      ...values,
      current,
      size
    }
    getData(data)
  };

  return (
    <>
      <CustomBreadcrumb arr={[t('table.editableTable.menu'), t('table.editableTable.subMenu')]} />
      <CommonForm
        ref={formRef}
        items={formItems}
        onReset={onReset}
        onFinish={onFinish}
      ></CommonForm>
      <CommonTable
        data={dataSource}
        columns={columns}
        current={current}
        pageSize={size}
        total={total}
        onChange={onChange}
      />
    </>
  );
};

export default Test;
