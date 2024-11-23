import React, { useEffect, useRef, useState } from 'react';
import CustomBreadcrumb from '/@/components/CommonBreadcrumb';
import { Popconfirm, Space, Tag, message } from 'antd';
import { useChangeLang } from '/@/hooks';
import CommonTable from '/@/components/CommonTable';
import CommonForm from '/@/components/CommonForm';
import { reqChangeAcitivity, reqDeleteActivity, reqGetActivityList } from '/@/services';
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom';

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

  const changeAcitivity = (id, state) => {
    const data = {
      id,
      state
    }
    reqChangeAcitivity(data).then(res => {
      console.log(123);
      getData()
    })
  }

  const onChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    getData(current, pageSize)
  };

  const handleDelete = (key) => {
    reqDeleteActivity(key).then(res => {
      message.success('This is a success message');
      getData()
    })
  }
  const history = useHistory();

  const gotoActivityDetail = (data) => {
    console.log(data, 123);
    const id = data.id
    history.push(`/table/activityDetail/${id}`);
  }

  const columns = [
    {
      title: '活动封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (data) => {
        return (
          <img style={{width:'50px',height:'50px'}} src={data.cover} alt="" />
        )
      }
    },
    {
      title: '活动标题',
      dataIndex: 'tittle',
      key: 'tittle'
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
      title: '参选人数',
      dataIndex: 'pnum',
      key: 'pnum',
    },
    {
      title: '票数',
      dataIndex: 'vnum',
      key: 'vnum',
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
          <a style={{color:'green'}} onClick={() => changeAcitivity(_.id,'approved')}>通过</a>
          <a style={{color:'red'}} onClick={() => changeAcitivity(_.id,'rejected')}>拒绝</a>
          <a onClick={() => gotoActivityDetail(_)} style={{ color: 'blue' }}>
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
      name: 'genre',
      type: 'Input',
      label: '类型',
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

  const onFinish = () => {
    getData()
  };

  const onReset = () => {
    getData()
  };

  return (
    <>
      <CustomBreadcrumb arr={['数据列表', '活动列表']} />
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
