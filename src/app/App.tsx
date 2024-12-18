import { useEffect, useMemo } from 'react';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Layout, Menu, MenuProps, theme, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import classNames from 'classnames';

import styles from './App.module.css';

import { Posts } from '@/entities/api/posts';
import { useAppStore } from '@/entities/store';
import { routes, routesList } from '@/app/router/routes.ts';
import { Users } from '@/entities/api/users';

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const setPosts = useAppStore((state) => state.setPosts);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const setUsers = useAppStore((state) => state.setUsers);
  const isAdmin = useAppStore((state) => state.userData?.isAdmin);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const postsData = await Posts.getAllPosts();
        setPosts(
          postsData.map((post) => ({
            ...post,
            isLiked: false,
            isDisliked: false,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };
    const fetchUsersData = async () => {
      try {
        const usersData = await Users.getAllUsers();

        setUsers(
          usersData.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchPostsData();
    fetchUsersData();
  }, [setPosts, setUsers]);

  const navigateTo: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const menuItems = useMemo(() => {
    const items: MenuProps['items'] = routesList.map((routeItem) => ({
      key: routeItem.link,
      label: routeItem.label,
    }));

    return isAdmin ? items : items.filter((item) => item?.key !== routes.admin);
  }, [isAdmin]);

  const contentStyles = classNames({
    [styles.content]: isLoggedIn,
    [styles.centerContent]: !isLoggedIn || location.pathname === routes.account,
  });

  return (
    <Layout>
      <Header className={styles.header}>
        <Typography.Text className={styles.headerTitle}>
          Whitebird.io Forum
        </Typography.Text>
      </Header>
      <Layout className={styles.layout}>
        {isLoggedIn && (
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              onClick={navigateTo}
              mode="inline"
              selectedKeys={[location.pathname]}
              className={styles.menu}
              items={menuItems}
            />
          </Sider>
        )}
        <Layout className={styles.childrenLayout}>
          <Content
            className={contentStyles}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
            <ScrollRestoration />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
