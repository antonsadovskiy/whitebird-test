import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createPostsSlice, PostsSliceType } from '@/entities/store/posts.ts';
import { AppSliceType, createAppSlice } from '@/entities/store/app.ts';

export type AppStore = PostsSliceType & AppSliceType;

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    ...createPostsSlice(...args),
    ...createAppSlice(...args),
  })),
);
