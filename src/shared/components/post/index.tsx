import { Avatar, Button, List } from 'antd';
import classNames from 'classnames';
import { LoadingOutlined, MessageOutlined } from '@ant-design/icons';

import styles from '@/pages/posts-page/styles.module.css';
import { FavouriteIcon } from '@/shared/components/favourite-icon';
import { LikeIcon } from '@/shared/components/like-icon';
import { CommentsSection } from '@/shared/components/comments-section';
import { ExtendedPostType } from '@/entities/store/posts.ts';

type PostPropsType = {
  onToggleFavourite: (id: number) => void;
  isInFavourites: boolean;
  onLikeHandler: (id: number) => void;
  onDislikeHandler: (id: number) => void;
  onShowCommentsHandler: (id: number) => void;
  onRemovePostHandler: (id: number) => void;
  isMyPost: boolean;
  onNavigateHandler?: (id: number) => void;
  isLoadingComments?: boolean;
  className?: string;
} & ExtendedPostType;

export const Post = ({
  isLiked,
  id,
  isDisliked,
  isInFavourites,
  userId,
  onRemovePostHandler,
  comments,
  body,
  title,
  isMyPost,
  onToggleFavourite,
  onNavigateHandler,
  onLikeHandler,
  onDislikeHandler,
  onShowCommentsHandler,
  isLoadingComments,
  className,
}: PostPropsType) => {
  return (
    <div className={styles.postContainer}>
      <List.Item
        className={styles.post}
        key={title}
        actions={[
          <FavouriteIcon
            key="favourites"
            isFavourite={isInFavourites}
            onClick={() => onToggleFavourite(id)}
            className={styles.actionIcon}
          />,
          <LikeIcon
            key="likes"
            isLiked={isLiked}
            className={styles.actionIcon}
            onClick={() => onLikeHandler(id)}
          />,
          <LikeIcon
            key="dislikes"
            isLiked={isDisliked}
            className={classNames(styles.actionIcon, styles.dislike)}
            onClick={() => onDislikeHandler(id)}
          />,
          isLoadingComments ? (
            <LoadingOutlined />
          ) : (
            <MessageOutlined
              onClick={() => onShowCommentsHandler(id)}
              className={styles.actionIcon}
              key="comments"
            />
          ),
          onNavigateHandler && (
            <Button key="navigate" onClick={() => onNavigateHandler(id)}>
              Read more
            </Button>
          ),
          isMyPost && (
            <Button danger key="delete" onClick={() => onRemovePostHandler(id)}>
              Delete
            </Button>
          ),
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`}
            />
          }
          title={title}
        />
        {body}
      </List.Item>
      <div className={className}>
        <CommentsSection comments={comments ?? []} postId={id} />
      </div>
    </div>
  );
};
