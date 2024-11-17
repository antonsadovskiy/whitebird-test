import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from 'antd/es/card/Card';
import { Button, Input, List, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import { useAppStore } from '@/entities/store';
import { usePost } from '@/hooks/usePost.ts';
import { Posts } from '@/entities/api/posts';
import { ActionButtons } from '@/pages/post-page/components/action-buttons';

export const PostPage = () => {
  const params = useParams<{ id: string }>();

  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const posts = useAppStore((state) => state.posts);
  const setCommentsToPost = useAppStore((state) => state.setCommentsToPost);
  const favourites = useAppStore((state) => state.favourites);
  const user = useAppStore((state) => state.userData);
  const users = useAppStore((state) => state.users);

  const postId = params.id;

  const {
    onShowCommentsHandler,
    onDislikeHandler,
    onLikeHandler,
    onToggleFavourite,
  } = usePost();

  const post = useMemo(() => {
    return posts.find((post) => post.id.toString() === postId);
  }, [postId, posts]);

  const author = useMemo(() => {
    const allUsers = [...users, user];
    return allUsers.find((user) => user?.id === post?.userId);
  }, [post?.userId, user, users]);

  const [commentText, setCommentText] = useState('');

  const addComment = useAppStore((state) => state.addComment);

  const sendMessage = useCallback(() => {
    if (commentText && user && user.email) {
      addComment(Number(postId), commentText, user.email);
      setCommentText('');
    }
  }, [addComment, commentText, postId, user]);

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        sendMessage();
      }
    },
    [sendMessage],
  );

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setIsLoadingComments(true);

        const data = await Posts.getPostComments(Number(postId));
        setCommentsToPost(Number(postId), data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingComments(false);
      }
    };
    if (post?.comments === undefined) {
      fetchPostComments();
    }
  }, [onShowCommentsHandler, post, postId, setCommentsToPost]);

  const isInFavourites = useMemo(() => {
    return favourites.includes(Number(postId));
  }, [favourites, postId]);

  return (
    <div className={styles.page}>
      <Typography.Title level={3}>
        Published by: {author?.name ?? 'Unknown'}
      </Typography.Title>
      {post && (
        <Card title={post.title} bordered>
          <div className={styles.postBody}>
            <Typography.Text>{post.body}</Typography.Text>
            <ActionButtons
              postId={Number(postId)}
              onLikeHandler={onLikeHandler}
              onDislikeHandler={onDislikeHandler}
              onToggleFavourite={onToggleFavourite}
              isLiked={post.isLiked}
              isDisliked={post.isDisliked}
              isInFavourites={isInFavourites}
            />
          </div>
        </Card>
      )}
      <div>
        <Typography.Title level={5}>Comments:</Typography.Title>
        <div className={styles.addComment}>
          <Input.TextArea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={onKeyDownHandler}
            placeholder="Type your comment..."
            autoSize={{ minRows: 1, maxRows: 1 }}
          />
          <Button
            disabled={!commentText}
            onClick={sendMessage}
            type="primary"
            icon={<SendOutlined />}
          >
            Publish comment
          </Button>
        </div>
        <List
          loading={isLoadingComments}
          itemLayout="horizontal"
          dataSource={post?.comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.email}</a>}
                description={item.body}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
