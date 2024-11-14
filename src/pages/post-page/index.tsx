import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useAppStore } from '@/entities/store';

export const PostPage = () => {
  const params = useParams<{ id: string }>();

  const posts = useAppStore((state) => state.posts);
  const postId = params.id;

  /*  const {
    onDislikeHandler,
    onShowCommentsHandler,
    onLikeHandler,
    onAddFavouriteHandler,
  } = usePost();*/

  const post = useMemo(() => {
    return posts.find((post) => post.id.toString() === postId);
  }, [postId, posts]);

  return <div>{post?.body}</div>;
};
