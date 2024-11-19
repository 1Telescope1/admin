import React, { useEffect, useRef, useState } from 'react';
import CustomBreadcrumb from '/@/components/CommonBreadcrumb';
import { Popconfirm, Space, Tag, message } from 'antd';
import { useChangeLang } from '/@/hooks';
import CommonTable from '/@/components/CommonTable';
import CommonForm from '/@/components/CommonForm';
import { reqDeleteActivity, reqGetActivityList } from '/@/services';
import dayjs from 'dayjs'

const Test = () => {
  const { t } = useChangeLang();
  const [dataSource, setDataSource] = useState<any>([]);
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)

  const getData = (current = page,pageSize = size) => {
    const values = formRef.current.form.getFieldsValue(true)
    const body = {
      ...values,
      page: current,
      size: pageSize
    }
    setLoading(true)
    reqGetActivityList(body).then(res => {
      const resData = res.data
      setDataSource(resData.records)
      setPage(resData.current)
      setSize(resData.size)
      setTotal(resData.total)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, []);

  const test = () => {
    console.log(123);
  };

  const onChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPage(current);
    setSize(pageSize);
    getData(current, pageSize)
  };

  const handleDelete = (key) => {
    reqDeleteActivity(key).then(res => {
      message.success('This is a success message');
      getData()
    })
  }

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
      title: '类型',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD')
      }
    },
    {
      title: '活动状态',
      dataIndex: 'state',
      key: 'state',
      render:(value) => {
        switch (value) {
          case 'editing':
            return <Tag color='processing'>编辑中</Tag>
          case 'pending':
            return <Tag color='warning'>审核中</Tag>
          case 'approved':
            return <Tag color='success'>通过</Tag>
          case 'rejected':
            return <Tag color='error'>拒绝</Tag>
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={test} style={{ color: 'blue' }}>
            查看详情
          </a>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a style={{ color: 'red' }}>Delete</a>
          </Popconfirm>
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
      page,
      size
    }
    getData(data)
  };

  const onReset = () => {
    const values = formRef.current.form.getFieldsValue(true)
    const data = {
      ...values,
      page,
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
        loading={loading}
        data={dataSource}
        columns={columns}
        current={page}
        pageSize={size}
        total={total}
        onChange={onChange}
      />
    </>
  );
};

export default Test;
