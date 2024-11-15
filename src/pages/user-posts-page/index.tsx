import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Typography } from 'antd';

import { useAppStore } from '@/entities/store';
import { PostsList } from '@/shared/components/posts-list';

export const UserPostsPage = () => {
  const params = useParams<{ id: string }>();

  const userId = params.id;

  const posts = useAppStore((state) => state.posts);
  const users = useAppStore((state) => state.users);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.userId === Number(userId));
  }, [userId, posts]);

  const user = useMemo(() => {
    return users.find((user) => user.id === Number(userId));
  }, [userId, users]);

  return (
    <>
      <Typography.Title level={2}>{user?.name}'s Posts:</Typography.Title>
      <PostsList list={filteredPosts} />
    </>
  );
};
