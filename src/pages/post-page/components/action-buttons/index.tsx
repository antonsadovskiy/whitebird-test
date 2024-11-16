import { Button } from 'antd';

import styles from '@/pages/post-page/styles.module.css';
import { LikeIcon } from '@/shared/components/like-icon';
import { FavouriteIcon } from '@/shared/components/favourite-icon';

type ActionButtonsPropsType = {
  isInFavourites: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  onLikeHandler: (id: number) => void;
  onDislikeHandler: (id: number) => void;
  onToggleFavourite: (id: number) => void;
  postId: number;
};

export const ActionButtons = ({
  isInFavourites,
  onToggleFavourite,
  onDislikeHandler,
  onLikeHandler,
  postId,
  isLiked,
  isDisliked,
}: ActionButtonsPropsType) => {
  return (
    <div className={styles.buttons}>
      <Button
        onClick={() => onLikeHandler(postId)}
        icon={<LikeIcon isLiked={isLiked} />}
      >
        Like
      </Button>
      <Button
        onClick={() => onDislikeHandler(postId)}
        icon={<LikeIcon isLiked={isDisliked} className={styles.dislike} />}
      >
        Dislike
      </Button>
      <Button
        onClick={() => onToggleFavourite(postId)}
        icon={
          <FavouriteIcon
            isFavourite={isInFavourites}
            className={styles.actionIcon}
          />
        }
      >
        {isInFavourites ? 'Remove from' : 'Add to'} favourites
      </Button>
    </div>
  );
};
