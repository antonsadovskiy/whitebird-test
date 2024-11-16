import { Button, Input } from 'antd';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import { CommentType } from '@/entities/api/posts/types.ts';
import { CommentItem } from '@/shared/components/comments-section/comment-item';
import { useAppStore } from '@/entities/store';

type CommentsSectionPropsType = {
  comments: CommentType[];
  postId: number;
};

export const CommentsSection = ({
  comments,
  postId,
}: CommentsSectionPropsType) => {
  const lastElemRef = useRef<HTMLDivElement>(null);

  const user = useAppStore((state) => state.userData);

  const [commentText, setCommentText] = useState('');

  const addComment = useAppStore((state) => state.addComment);

  const sendMessage = useCallback(() => {
    if (commentText && user && user.email) {
      addComment(postId, commentText, user.email);
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

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <div className={styles.comments}>
      <div className={styles.list}>
        {comments.map((comment, index) => {
          const isLast = index === comments.length - 1;
          return (
            <CommentItem
              ref={isLast ? lastElemRef : null}
              key={`${postId}-${comment.id}`}
              {...comment}
            />
          );
        })}
      </div>
      <div className={styles.addComment}>
        <Input.TextArea
          onKeyDown={onKeyDownHandler}
          autoSize={{ minRows: 2, maxRows: 2 }}
          value={commentText}
          onChange={onChangeText}
          placeholder="Type your comment"
        />
        <Button
          disabled={!commentText}
          onClick={sendMessage}
          type="primary"
          className={styles.sendButton}
          icon={<SendOutlined />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
