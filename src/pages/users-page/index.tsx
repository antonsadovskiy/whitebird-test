import { List } from 'antd';

import { useAppStore } from '@/entities/store';
import { UserItem } from '@/pages/users-page/components/user-item';

export const UsersPage = () => {
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
        return <UserItem {...item} />;
      }}
    />
  );
};
