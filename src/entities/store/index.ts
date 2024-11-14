import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createPostsSlice, PostsSliceType } from '@/entities/store/posts.ts';

export type AppStore = PostsSliceType;

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    ...createPostsSlice(...args),
  })),
);
