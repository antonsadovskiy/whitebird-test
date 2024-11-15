import { Avatar, Button, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@/entities/store';

export const UsersPage = () => {
  const navigate = useNavigate();

  const users = useAppStore((state) => state.users);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 10,
      }}
      dataSource={users}
      renderItem={(item) => {
        return (
          <List.Item
            key={item.id}
            actions={[
              <Button
                onClick={() => navigate(`/users/${item.id}/posts`)}
                key="show-user-posts"
              >
                Show user posts
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`}
                />
              }
              title={item.name}
            />
            <div>
              <Typography.Text>
                <strong>Email:</strong> {item.email}
              </Typography.Text>
            </div>
            <div>
              <Typography.Text>
                <strong>Username:</strong> {item.username}
              </Typography.Text>
            </div>
          </List.Item>
        );
      }}
    />
  );
};
