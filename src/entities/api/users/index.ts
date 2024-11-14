import { Api } from '../index.ts';

import { UserType } from './types.ts';

export class Users {
  public static async getAllUsers() {
    const response = await Api.axios.get<UserType[]>('/users');

    return response.data;
  }
}
