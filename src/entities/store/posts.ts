import { StateCreator } from 'zustand/index';

import { AppStore } from '@/entities/store/index.ts';
import { CommentType, PostType } from '@/entities/api/posts/types.ts';

export type ExtendedPostType = {
  isLiked: boolean;
  isDisliked: boolean;
  comments: CommentType[];
} & PostType;

type StateType = {
  posts: ExtendedPostType[];
};

type ActionsType = {
  setPosts: (posts: ExtendedPostType[]) => void;
  setLikeToPost: (postId: number) => void;
  setDislikeToPost: (postId: number) => void;
  addPost: (userId: number, title: string, body: string) => void;
  setCommentsToPost: (postId: number, comments: CommentType[]) => void;
  addComment: (postId: number, body: string, email: string) => void;
};

export type PostsSliceType = StateType & ActionsType;

export const createPostsSlice: StateCreator<
  AppStore,
  [['zustand/devtools', never]],
  [],
  PostsSliceType
> = (set) => ({
  posts: [],
  setPosts: (posts) => set(() => ({ posts })),
  setLikeToPost: (postId) =>
    set((state) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, isDisliked: false }
            : post,
        ),
      };
    }),
  setDislikeToPost: (postId) =>
    set((state) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, isDisliked: !post.isDisliked, isLiked: false }
            : post,
        ),
      };
    }),
  addPost: (userId, title, body) =>
    set((state) => {
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            body,
            title,
            isLiked: false,
            isDisliked: false,
            comments: [],
            userId,
          },
          ...state.posts,
        ],
      };
    }),
  setCommentsToPost: (postId, comments) =>
    set((state) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, comments } : post,
        ),
      };
    }),
  addComment: (postId, body, email) =>
    set((state) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  {
                    id: [post.comments].length + 1,
                    body,
                    email,
                    postId,
                    name: 'new post',
                  },
                  ...post.comments,
                ],
              }
            : post,
        ),
      };
    }),
});
