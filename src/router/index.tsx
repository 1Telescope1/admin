import React, { lazy, Suspense } from 'react';
import { withRouter, Switch, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import random from 'number-random';

const CommonRoute = lazy(() => import('/@/components/CommonRoute'));
const Test = lazy(() => import('/@/pages/Table/Test'));
const NotFound = lazy(() => import('/@/pages/NotFound'));
const User = lazy(() => import('/@/pages/Table/User'))
const AcitivityDetail = lazy(() => import('/@/pages/Table/ActivityDetail'))

const routes: Array<{
  component:
  | React.ComponentType<any>
  | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
  path?: string;
}> = [
    {
      component: Test,
      path: '/table/activity',
    },
    {
      component: User,
      path: '/table/user',
    },
    {
      component: AcitivityDetail,
      path: '/table/activityDetail/:id',
    },
    {
      component: NotFound,
    },
  ];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const AppRouter = () => (
  <Suspense
    fallback={
      <Space size="large" className="loading flex-all-center">
        <Spin indicator={antIcon} size="large" tip="加载中" />
      </Space>
    }
  >
    <Switch>
      {routes &&
        routes.map(
          (route: {
            component:
            | React.ComponentType<any>
            | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
            path?: string;
          }) => {
            const key = random(100, 999),
              { component, path } = route;
            // @ts-ignore
            return <CommonRoute path={path} key={key} exact component={component} />;
          },
        )}
    </Switch>
  </Suspense>
);

export default withRouter(AppRouter);
