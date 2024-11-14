import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Layout, Menu, MenuProps, theme, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import styles from './App.module.css';

import { Posts } from '@/entities/api/posts';
import { useAppStore } from '@/entities/store';

const { Text } = Typography;

const items: MenuProps['items'] = ['Posts', 'Users', 'Favourites'].map(
  (key) => ({
    key,
    label: key,
  }),
);

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const setPosts = useAppStore((state) => state.setPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Posts.getAllPosts();
        setPosts(
          data.map((post) => ({
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

    fetchData();
  }, [setPosts]);

  return (
    <Layout>
      <Header className={styles.header}>
        <Text className={styles.headerTitle}>Whitebird.io Forum</Text>
      </Header>
      <Layout className={styles.layout}>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['Посты']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
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
