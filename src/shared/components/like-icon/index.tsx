import classNames from 'classnames';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

type LikeIconPropsType = {
  isLiked: boolean;
  onClick?: () => void;
  className?: string;
};

export const LikeIcon = ({
  isLiked,
  onClick,
  className,
}: LikeIconPropsType) => {
  const iconStyles = classNames(className, {
    [styles.liked]: isLiked,
  });

  return isLiked ? (
    <LikeFilled onClick={onClick} className={iconStyles} />
  ) : (
    <LikeOutlined onClick={onClick} className={iconStyles} />
  );
};
