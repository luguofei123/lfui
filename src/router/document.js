export const documentRoutes = [
  {
    path: '/document',
    moduleCode: 'pub',
    meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '组件使用手册' },
    component: () => import('@/views/document/index.vue'),
    children: [
      {
        path: 'buttonExp',
        moduleCode: 'pub',
        name: 'buttonExp',
        meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '按钮例子' },
        component: () => import('@/views/document/manual/buttonExp.vue')
      },
      {
        path: 'buttonExp1',
        moduleCode: 'pub',
        name: 'buttonExp1',
        meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '按钮例子' },
        component: () => import('@/views/document/manual/buttonExp1.vue')
      }
    ]
  }
]
