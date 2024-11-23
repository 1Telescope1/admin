import React, { memo, FC } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import classNames from 'classnames';
import { home } from '/@/services';
import { useStore } from '/@/stores';
import style from './index.module.less';
import axios from 'axios';
import { getUsers } from '../../../mock';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ILogin {
  history: any;
}

async function loginService(username: string, password: string) {
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  try {
    const response = await axios.post(`/api/v1/users/login`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });    
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('username', response.data.data.username)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const Login: FC<ILogin> = ({ history }: ILogin) => {
  const { loginStore } = useStore();
  const onFinish = async (values: { username: string; password: string; remember: boolean }) => {
    const res = await loginService(values.username, values.password);

    if (res.code == 200) {
      const data = getUsers(values.username, values.password, true);
      // @ts-ignore
      const { roleType , userName, avatar } = data.data;
      await loginStore.setUserInfo({
        roleType,
        userName,
        avatar,
      });
      await loginStore.toggleLogin(true, { userName });
      await history.push('/table/activity');
    } else {
      message.error(`${res.msg}, 用户名和密码不符`);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={classNames(style['login'], 'flex-all-center')}>
      <div className={classNames(style['login__form'], 'flex-all-center')}>
        <span className={style['login__form__title']}>React Admin</span>
        <Form
          {...layout}
          name="basic"
          initialValues={{ username: 'admin', password: 'admin', remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={style['login__form__form']}
        >
          <Form.Item
            label="用户名"
            name="username"
            labelAlign="left"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="管理admin" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            labelAlign="left"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="管理admin" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" className={style['login__form__form__submit']}>
            提交
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default memo(Login);
