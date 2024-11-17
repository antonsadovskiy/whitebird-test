import { List } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useCallback } from 'react';

import { useAppStore } from '@/entities/store';
import { PostItem } from '@/pages/admin-posts-page/components/post-item';

export const AdminPostsPage = () => {
  const posts = useAppStore((state) => state.posts);
  const setPosts = useAppStore((state) => state.setPosts);

  const movePost = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (dragIndex === hoverIndex) {
        return;
      }

      const updatedPosts = [...posts];
      const [dragPost] = updatedPosts.splice(dragIndex, 1);
      updatedPosts.splice(hoverIndex, 0, dragPost);

      setPosts(updatedPosts);
    },
    [posts, setPosts],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <List
        itemLayout="vertical"
        size="small"
        dataSource={posts}
        renderItem={(item, index) => (
          <PostItem
            key={item.id}
            postId={item.id}
            index={index}
            movePost={movePost}
            body={item.body}
            title={item.title}
            userId={item.userId}
          />
        )}
      />
    </DndProvider>
  );
};
