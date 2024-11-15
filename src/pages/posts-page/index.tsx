import { Button, Form, Input, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './styles.module.css';

import { useAppStore } from '@/entities/store';
import { Post } from '@/shared/components/post';
import { usePost } from '@/hooks/usePost.ts';

const schema = z.object({
  title: z.string(),
  body: z.string(),
});

type AddNewPostType = z.infer<typeof schema>;

export const PostsPage = () => {
  const posts = useAppStore((state) => state.posts);
  const user = useAppStore((state) => state.userData);
  const favourites = useAppStore((state) => state.favourites);

  const { handleSubmit, control, reset } = useForm<AddNewPostType>({
    resolver: zodResolver(schema),
  });

  const {
    onNavigateHandler,
    onDislikeHandler,
    onShowCommentsHandler,
    onRemovePostHandler,
    onToggleFavourite,
    addPost,
    postsIdLoadingComments,
    postsIdToShowComments,
    onLikeHandler,
  } = usePost();

  const onSubmitHandler: SubmitHandler<AddNewPostType> = useCallback(
    (data) => {
      if (user && user.id) {
        addPost(user.id, data.title, data.body);
        reset();
      }
    },
    [addPost, reset, user],
  );

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
      <List
        itemLayout="vertical"
        size="small"
        pagination={{ pageSize: 10 }}
        dataSource={posts}
        renderItem={(item) => {
          const isCommentsVisible = postsIdToShowComments.includes(item.id);

          const commentsStyles = classNames(styles.comments, {
            [styles.commentsOpened]: isCommentsVisible,
            [styles.commentsClosed]: !isCommentsVisible,
          });

          const isLoadingComments = postsIdLoadingComments.includes(item.id);

          const isInFavourites = favourites.includes(item.id);

          const isMyPost = item.userId === user?.id;

          return (
            <Post
              onToggleFavourite={onToggleFavourite}
              isInFavourites={isInFavourites}
              onLikeHandler={onLikeHandler}
              onDislikeHandler={onDislikeHandler}
              onNavigateHandler={onNavigateHandler}
              onShowCommentsHandler={onShowCommentsHandler}
              className={commentsStyles}
              isLoadingComments={isLoadingComments}
              isMyPost={isMyPost}
              onRemovePostHandler={onRemovePostHandler}
              {...item}
            />
          );
        }}
      />
    </div>
  );
};
