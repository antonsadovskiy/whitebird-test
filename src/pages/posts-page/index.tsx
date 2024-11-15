import { Button, Form, Input, Select } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.css';

import { useAppStore } from '@/entities/store';
import { usePost } from '@/hooks/usePost.ts';
import { PostsList } from '@/shared/components/posts-list';

const schema = z.object({
  title: z.string(),
  body: z.string(),
});

type AddNewPostType = z.infer<typeof schema>;

export const PostsPage = () => {
  const posts = useAppStore((state) => state.posts);
  const user = useAppStore((state) => state.userData);
  const users = useAppStore((state) => state.users);

  const { handleSubmit, control, reset } = useForm<AddNewPostType>({
    resolver: zodResolver(schema),
  });

  const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>([]);

  const { addPost } = usePost();

  const onSubmitHandler: SubmitHandler<AddNewPostType> = useCallback(
    (data) => {
      if (user && user.id) {
        addPost(user.id, data.title, data.body);
        reset();
      }
    },
    [addPost, reset, user],
  );

  const usersToSearch = useMemo(() => {
    if (user) {
      return [
        ...users,
        user && {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      ]
        .filter(Boolean)
        .map((user) => ({
          value: user.id,
          label: user.name,
        }));
    }
    return [];
  }, [user, users]);

  const filteredPosts = useMemo(() => {
    if (selectedUsersIds.length === 0) {
      return posts;
    }
    return posts.filter((post) => selectedUsersIds.includes(post.userId));
  }, [posts, selectedUsersIds]);

  const onChange = (value: number[]) => {
    setSelectedUsersIds(value);
  };

  return (
    <div className={styles.page}>
      <Form
        onFinish={handleSubmit(onSubmitHandler)}
        className={styles.addNewPost}
      >
        <FormItem control={control} name="title">
          <Input.TextArea
            placeholder="Add new post title"
            autoSize={{ minRows: 1, maxRows: 1 }}
          />
        </FormItem>
        <FormItem control={control} name="body">
          <Input.TextArea
            placeholder="Add new post text"
            autoSize={{ minRows: 3, maxRows: 3 }}
          />
        </FormItem>
        <Button htmlType="submit" type="default" icon={<SendOutlined />}>
          Publish
        </Button>
      </Form>
      <Select
        showSearch
        mode="multiple"
        placeholder="Select a user"
        optionFilterProp="label"
        onChange={onChange}
        options={usersToSearch}
      />
      <PostsList list={filteredPosts} />
    </div>
  );
};
