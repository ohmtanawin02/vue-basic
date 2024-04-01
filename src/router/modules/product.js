export default {
  path: '/products',
  component: () => import('@/views/product/Product.vue'),
  meta: {
    title: 'Product List'
  },
  name: 'Items',
  redirect: {
    name: 'ProductList'
  },
  children: [
    {
      path: 'list',
      name: 'ProductList',
      component: () => import('@/views/product/pages/List.vue'),
      meta: {
        hideBreadcrumbs: true
      }
    },
    {
      path: 'list/create',
      name: 'ProductCreate',
      component: () => import('@/views/product/pages/Create.vue'),
      meta: {
        title: 'Create New Product'
      }
    },
    {
      path: ':id',
      name: 'ProductDetails',
      component: () => import('@/views/product/pages/details/Details.vue'),
      meta: {
        title: 'ProductDetails'
      },
      redirect: {
        name: 'ProductId'
      },
      children: [
        {
          path: '',
          name: 'ProductId',
          component: () => import('@/views/product/pages/details/pages/Id.vue'),
          meta: {
            hideBreadcrumbs: true
          }
        },
        {
          path: 'edit',
          name: 'ProductEdit',
          component: () => import('@/views/product/pages/details/pages/Edit.vue'),
          meta: {
            title: 'Edit Product'
          }
        }
      ]
    }
  ]
}