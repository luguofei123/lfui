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
        path: 'radioExp',
        moduleCode: 'pub',
        name: 'radioExp',
        meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '单选例子' },
        component: () => import('@/views/document/manual/radioExp.vue')
      },
      {
        path: 'checkboxExp',
        moduleCode: 'pub',
        name: 'checkboxExp',
        meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '复选例子' },
        component: () => import('@/views/document/manual/checkboxExp.vue')
      },
      {
        path: 'selectExp',
        moduleCode: 'pub',
        name: 'selectExp',
        meta: { moduleName: '公共组件', subModuleName: '公共组件', menuName: '下拉选择例子' },
        component: () => import('@/views/document/manual/selectExp.vue')
      }
    ]
  }
]
