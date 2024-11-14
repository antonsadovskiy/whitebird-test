import { Api } from '../index.ts';

import { CommentType, PostType } from './types.ts';

export class Posts {
  public static async getAllPosts() {
    const response = await Api.axios.get<PostType[]>('/posts');

    return response.data;
  }

  public static async getPostsByUserId(id: number) {
    const response = await Api.axios.get<PostType[]>(`/posts?userId=${id}`);

    return response.data;
  }

  public static async getPostComments(id: number) {
    const response = await Api.axios.get<CommentType[]>(
      `/posts/${id}/comments`,
    );

    return response.data;
  }
}
