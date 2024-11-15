import classNames from 'classnames';
import { List } from 'antd';

import styles from './styles.module.css';

import { ExtendedPostType } from '@/entities/store/posts.ts';
import { Post } from '@/shared/components/post';
import { useAppStore } from '@/entities/store';
import { usePost } from '@/hooks/usePost.ts';

type PostsListPropsType = {
  list: ExtendedPostType[];
};

export const PostsList = ({ list }: PostsListPropsType) => {
  const favourites = useAppStore((state) => state.favourites);
  const user = useAppStore((state) => state.userData);

  const {
    onNavigateHandler,
    onDislikeHandler,
    onShowCommentsHandler,
    onRemovePostHandler,
    onToggleFavourite,
    postsIdLoadingComments,
    postsIdToShowComments,
    onLikeHandler,
  } = usePost();

  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{ position: 'bottom', align: 'center' }}
      dataSource={list}
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
  );
};
