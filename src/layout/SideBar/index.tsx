import React, { FC, useState, useEffect, memo } from 'react';
import { Menu, Layout } from 'antd';
import {
  TableOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  FileExcelOutlined,
  MehOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import style from './index.module.less';

const { Sider } = Layout;

interface CompItemType {
  key: string;
  component: React.ReactNode;
  path: string;
  sub?: CompItemType[];
  icon?: string;
}

interface ISlideBar {
  history: any;
  menus: Array<CompItemType>;
  collapsed: boolean;
}

const SlideBar: FC<ISlideBar> = ({ history, menus, collapsed }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard']);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'table':
        return <TableOutlined />;
      case 'chart':
        return <BarChartOutlined />;
      case 'components':
        return <AppstoreOutlined />;
      case 'excel':
        return <FileExcelOutlined />;
      case '404':
        return <MehOutlined />;
      case 'dashboard':
        return <HomeOutlined />;
      default:
        return null;
    }
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const onMenuItemClick = (item: { keyPath: string[]; key: string }) => {
    const selectedMenu = menus.find(menu => menu.key === item.key) || menus.flatMap(menu => menu.sub || []).find(subMenu => subMenu.key === item.key);
    if (selectedMenu) {
      history.push(selectedMenu.path);
    }
    sessionStorage.setItem('openKeys', JSON.stringify(item.keyPath));
    sessionStorage.setItem('selectedKeys', JSON.stringify([item.key]));
    setSelectedKeys([item.key]);
    setOpenKeys(item.keyPath);
  };

  useEffect(() => {
    const storedOpenKeys = sessionStorage.getItem('openKeys');
    const storedSelectedKeys = sessionStorage.getItem('selectedKeys');
    setOpenKeys(storedOpenKeys ? JSON.parse(storedOpenKeys) : []);
    setSelectedKeys(storedSelectedKeys ? JSON.parse(storedSelectedKeys) : ['dashboard']);
  }, []);

  return (
    <Sider style={{ position: 'fixed' }} trigger={null} collapsible collapsed={collapsed}>
      <Menu
        className={style['menus']}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        onOpenChange={onOpenChange}
        onClick={onMenuItemClick}
        items={menus.map((menu: CompItemType) => {
          const { component, key, sub, icon } = menu;

          if (sub && sub.length) {
            return {
              key,
              icon: icon && renderIcon(icon),
              label: component,
              children: sub.map((s: CompItemType) => ({
                key: s.key,
                label: s.component,
              })),
            };
          } else {
            return {
              key,
              icon: icon && renderIcon(icon),
              label: component,
            };
          }
        })}
      />
    </Sider>
  );
};

export default memo(SlideBar);