import React, { FC, Suspense } from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';
import { Provider } from 'mobx-react';
import { store, StoreContext } from '/@/stores';
import Login from './pages/Login';
import Home from './pages/Home';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const App: FC = () => {
  console.log(import.meta.env.VITE_BASE_API, 123);
  
  return (
    <Provider {...store} className="App">
      <StoreContext.Provider value={store}>
        <Router>
          <Suspense
            fallback={
              <Space size="large" className="loading flex-all-center">
                <Spin indicator={antIcon} size="large" tip="加载中" />
              </Space>
            }
          >
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </StoreContext.Provider>
    </Provider>
  );
};

export default App;
