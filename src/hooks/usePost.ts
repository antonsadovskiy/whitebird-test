import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Posts } from '@/entities/api/posts';
import { useAppStore } from '@/entities/store';

export const usePost = () => {
  const navigate = useNavigate();

  const posts = useAppStore((state) => state.posts);

  const setLikeToPost = useAppStore((state) => state.setLikeToPost);
  const setDislikeToPost = useAppStore((state) => state.setDislikeToPost);
  const setCommentsToPost = useAppStore((state) => state.setCommentsToPost);
  const addPost = useAppStore((state) => state.addPost);
  const removePost = useAppStore((state) => state.removePost);
  const toggleFavourite = useAppStore((state) => state.toggleFavourite);

  const [postsIdToShowComments, setPostsIdToShowComments] = useState<number[]>(
    [],
  );
  const [postsIdLoadingComments, setPostsIdLoadingComments] = useState<
    number[]
  >([]);

  const onRemovePostHandler = useCallback(
    (id: number) => {
      removePost(id);
    },
    [removePost],
  );

  const onToggleFavourite = useCallback(
    (postId: number) => {
      toggleFavourite(postId);
    },
    [toggleFavourite],
  );

  const onNavigateHandler = useCallback(
    (id: number) => {
      navigate(`/posts/${id}`);
    },
    [navigate],
  );

  const onLikeHandler = useCallback(
    (postId: number) => {
      setLikeToPost(postId);
    },
    [setLikeToPost],
  );

  const onDislikeHandler = useCallback(
    (postId: number) => {
      setDislikeToPost(postId);
    },
    [setDislikeToPost],
  );

  const onShowCommentsHandler = useCallback(
    async (postId: number) => {
      const post = posts.find((post) => post.id === postId);

      // сделано для того, чтобы не терялись добавленные пользотелем комментарии после повторной попытки открытия списка комментариев
      if (!postsIdToShowComments.includes(postId)) {
        if (post?.comments.length === 0) {
          try {
            setPostsIdLoadingComments((prev) => [...prev, postId]);

            const data = await Posts.getPostComments(postId);
            setCommentsToPost(postId, data);

            setPostsIdToShowComments((prev) => [...prev, postId]);
          } catch (e) {
            console.error(e);
          } finally {
            setPostsIdLoadingComments((prev) =>
              prev.filter((id) => id !== postId),
            );
          }
          return;
        } else {
          setPostsIdToShowComments((prev) => [...prev, postId]);
          return;
        }
      }
      setPostsIdToShowComments((prev) => prev.filter((id) => id !== postId));
    },
    [posts, postsIdToShowComments, setCommentsToPost],
  );

  return {
    onToggleFavourite,
    onNavigateHandler,
    onLikeHandler,
    onRemovePostHandler,
    onDislikeHandler,
    onShowCommentsHandler,
    addPost,
    postsIdLoadingComments,
    postsIdToShowComments,
  };
};
