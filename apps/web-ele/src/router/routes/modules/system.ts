import type { RouteRecordRaw } from 'vue-router';
import { BasicLayout } from '#/layouts';
const system: RouteRecordRaw[] = [
  {
    name: 'System',
    path: '/system',
    component: BasicLayout,
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-outlined',
      sort: 2,
    },
    children: [
      {
        name: 'SystemUser',
        path: 'user',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'ant-design:user-outlined',
        },
      },
      {
        name: 'SystemRole',
        path: 'role',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'ant-design:team-outlined',
        },
      },
      {
        name: 'SystemMenu',
        path: 'menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'ant-design:menu-outlined',
        },
      },
    ],
  },
];

export default system;
