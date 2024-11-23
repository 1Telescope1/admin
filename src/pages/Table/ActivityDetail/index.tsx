import React, { useEffect, useRef, useState } from 'react';
import CustomBreadcrumb from '/@/components/CommonBreadcrumb';
import { Popconfirm, Space, Tag, message } from 'antd';
import CommonTable from '/@/components/CommonTable';
import CommonForm from '/@/components/CommonForm';
import { reqAcitivityUser, reqBanUser, reqUnBanUser, reqUserList } from '/@/services';
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom';

const Test = () => {
  // @ts-ignore
  let { id } = useParams()
  console.log(id);

  const [dataSource, setDataSource] = useState<any>([]);
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false)

  const getData = (current = page, pageSize = size) => {
    // const values = formRef.current.form.getFieldsValue(true)
    const body = {
      // ...values,
      page: current,
      pageSize: pageSize
    }
    // id = '1855216353733324844'
    setLoading(true)
    reqAcitivityUser(id).then(res => {
      console.log(res, 123);
      const resData = res
      setDataSource(resData.data)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, []);

  const onChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    getData(current, pageSize)
  };

  const banUser = (data, status) => {
    console.log(data, dataSource);

    const id = data.id
    let promise
    if (status) {
      promise = reqBanUser
    } else {
      promise = reqUnBanUser
    }
    console.log(id);

    promise(String(id)).then(res => {
      getData()
    })
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (data) => {
        return (
          <img style={{ width: '50px', height: '50px' }} src={data?.avatar} alt="" />
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '个人介绍',
      dataIndex: 'introduction',
      key: 'introduction',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD')
      }
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        return data == 0 ? <Tag color='success'>正常</Tag> : <Tag color='error'>封禁</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: 'red' }} onClick={() => banUser(_, true)}>封禁</a>
          <a style={{ color: 'green' }} onClick={() => banUser(_, false)}>解禁</a>
        </Space>
      ),
    },
  ];

  const formItems = [
    {
      name: 'username',
      type: 'Input',
      label: '用户名',
    }
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
      <CustomBreadcrumb arr={['数据列表', '活动投票用户列表']} />
      {/* <CommonForm
        ref={formRef}
        items={formItems}
        onReset={onReset}
        onFinish={onFinish}
      ></CommonForm> */}
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
