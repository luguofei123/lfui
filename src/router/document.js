export const documentRoutes = [
  {
    path: '/document',
    moduleCode: 'pub',
    meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '组件使用手册' },
    component: () => import('@/views/document/index.vue')
  }
]
