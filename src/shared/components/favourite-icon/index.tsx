import { StarFilled, StarOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import styles from './styles.module.css';

type FavouriteIconPropsType = {
  isFavourite: boolean;
  onClick?: () => void;
  className?: string;
};

export const FavouriteIcon = ({
  isFavourite,
  onClick,
  className,
}: FavouriteIconPropsType) => {
  const iconStyles = classNames(className, {
    [styles.favourited]: isFavourite,
  });

  return isFavourite ? (
    <StarFilled onClick={onClick} className={iconStyles} />
  ) : (
    <StarOutlined onClick={onClick} className={iconStyles} />
  );
};
