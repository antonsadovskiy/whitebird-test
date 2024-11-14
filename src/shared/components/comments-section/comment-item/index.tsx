import { Typography } from 'antd';
import { forwardRef } from 'react';

import styles from './styles.module.css';

import { CommentType } from '@/entities/api/posts/types.ts';

export const CommentItem = forwardRef<HTMLDivElement, CommentType>(
  ({ body, email }, ref) => {
    return (
      <div ref={ref} className={styles.comment}>
        <Typography.Text strong>{email}</Typography.Text>
        <Typography.Text>{body}</Typography.Text>
      </div>
    );
  },
);
