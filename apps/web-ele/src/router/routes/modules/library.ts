import type { RouteRecordRaw } from 'vue-router';
import { BasicLayout } from '#/layouts';


const library: RouteRecordRaw[] = [{
  path: '/library',
  name: 'Library',
  component: BasicLayout,
  children: [
    {
      path: 'user',
      name: 'LibraryUser',
      component: () => import('#/views/library/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'icon-park-outline:user',
      },
    },
    {
      path: 'book',
      name: 'LibraryBook',
      component: () => import('#/views/library/book/index.vue'),
      meta: {
        title: '图书管理',
        icon: 'icon-park-outline:books',
      },
    },
    {
      path: 'lend-record',
      name: 'LibraryLendRecord',
      component: () => import('#/views/library/lend-record/index.vue'),
      meta: {
        title: '借阅记录',
        icon: 'icon-park-outline:history',
      },
    },
    {
      path: 'person',
      name: 'LibraryPerson',
      component: () => import('#/views/library/person/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'icon-park-outline:people',
      },
    },
    {
      path: 'dashboard',
      name: 'LibraryDashboard',
      component: () => import('#/views/library/dashboard/index.vue'),
      meta: {
        title: '统计面板',
        icon: 'icon-park-outline:dashboard',
      },
    },
  ],
}];

export default library;
