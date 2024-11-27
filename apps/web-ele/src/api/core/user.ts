import type { UserInfo, UserState } from '@vben/types';

import { requestClient, baseRequestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/user/info');
}

// 获取用户列表
export async function getUserListApi() {
  return baseRequestClient.get('/user/list');
}

// 新建用户
export async function createUserApi(data: UserState) {
  return baseRequestClient.post('/user', data);
}
