import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Layout, Menu, MenuProps, theme, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import classNames from 'classnames';

import styles from './App.module.css';

import { Posts } from '@/entities/api/posts';
import { useAppStore } from '@/entities/store';
import { routesList } from '@/app/router/routes.ts';
import { Users } from '@/entities/api/users';

const { Text } = Typography;

const items: MenuProps['items'] = routesList.map((routeItem) => ({
  key: routeItem.link,
  label: routeItem.label,
}));

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const setPosts = useAppStore((state) => state.setPosts);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const setUsers = useAppStore((state) => state.setUsers);
  const userData = useAppStore((state) => state.userData);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const postsData = await Posts.getAllPosts();
        setPosts(
          postsData.map((post) => ({
            ...post,
            isLiked: false,
            isDisliked: false,
            comments: [],
          })),
        );
      } catch (e) {
        console.error(e);
      }
    };
    const fetchUsersData = async () => {
      try {
        const usersData = await Users.getAllUsers();

        setUsers(usersData);
      } catch (e) {
        console.error(e);
      }
    };

    if (userData) {
      fetchPostsData();
      fetchUsersData();
    }
  }, [setPosts, setUsers, userData]);

  const navigateTo: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const contentStyles = classNames({
    [styles.content]: isLoggedIn,
    [styles.authPageContent]: !isLoggedIn,
  });

  return (
    <Layout>
      <Header className={styles.header}>
        <Text className={styles.headerTitle}>Whitebird.io Forum</Text>
      </Header>
      <Layout className={styles.layout}>
        {isLoggedIn && (
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              onClick={navigateTo}
              mode="inline"
              defaultSelectedKeys={['Posts']}
              className={styles.menu}
              items={items}
            />
          </Sider>
        )}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className={contentStyles}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
