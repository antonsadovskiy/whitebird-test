import { Avatar, List } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

type PostItemPropsType = {
  postId: number;
  userId: number;
  title: string;
  index: number;
  body: string;
  movePost: (from: number, to: number) => void;
};

type DragItem = {
  index: number;
  id: number;
  type: string;
};

export const PostItem = ({
  userId,
  index,
  postId,
  title,
  body,
  movePost,
}: PostItemPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: 'POST',
    drop(item: DragItem) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      movePost(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'POST',
    item: { id: postId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const listItemStyles = classNames(styles.item, {
    [styles.itemDragging]: isDragging,
  });

  drag(drop(ref));

  return (
    <List.Item className={listItemStyles} ref={ref}>
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
  );
};
