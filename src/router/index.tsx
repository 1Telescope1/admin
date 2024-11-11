import React, { lazy, Suspense } from 'react';
import { withRouter, Switch, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import random from 'number-random';

const CommonRoute = lazy(() => import('/@/components/CommonRoute'));
const Dashboard = lazy(() => import('/@/pages/Dashboard'));
const EditableTable = lazy(() => import('/@/pages/Table/EditableTable'));
const DragSortingTable = lazy(() => import('/@/pages/Table/DragSortingTable'));
const Test = lazy(() => import('/@/pages/Table/Test'));
const LineChart = lazy(() => import('/@/pages/Chart/LineChart'));
const PieChart = lazy(() => import('/@/pages/Chart/PieChart'));
const RichText = lazy(() => import('/@/pages/Components/RichText'));
const Markdown = lazy(() => import('/@/pages/Components/Markdown'));
const JsonEditor = lazy(() => import('/@/pages/Components/JsonEditor'));
const ExcelExport = lazy(() => import('/@/pages/Excel/Export'));
const NotFound = lazy(() => import('/@/pages/NotFound'));

const routes: Array<{
  component:
    | React.ComponentType<any>
    | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>;
  path?: string;
}> = [
  {
    component: Dashboard,
    path: '/dashboard',
  },
  {
    component: EditableTable,
    path: '/table/editableTable',
  },
  {
    component: DragSortingTable,
    path: '/table/dragSortingTable',
  },
  {
    component: Test,
    path: '/table/test',
  },
  {
    component: LineChart,
    path: '/chart/lineChart',
  },
  {
    component: PieChart,
    path: '/chart/pieChart',
  },
  {
    component: RichText,
    path: '/components/richText',
  },
  {
    component: Markdown,
    path: '/components/markdown',
  },
  {
    component: JsonEditor,
    path: '/components/jsonEditor',
  },
  {
    component: ExcelExport,
    path: '/excel/export',
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
