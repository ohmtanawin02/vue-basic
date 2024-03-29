export default {
  path: '/product-category',
  name: 'ProductCategory',
  component: () => import('@/views/product-category/ProductCategory.vue'),
  meta: {
    title: 'Product Category List'
  },
  redirect: {
    name: 'ProductCategoriesList'
  },
  children: [
    {
      path: '',
      name: 'ProductCategoriesList',
      component: () => import('@/views/product-category/pages/List.vue'),
      meta: {
        hideBreadcrumbs: true
      }
    },
    {
      path: 'create',
      name: 'ProductCategoryCreate',
      component: () => import('@/views/product-category/pages/Create.vue'),
      meta: {
        title: 'New Product Category'
      }
    },
    {
      path: ':id',
      name: 'ProductCategoryDetails',
      component: () => import('@/views/product-category/pages/details/Details.vue'),
      meta: {
        title: 'Product Category'
      },
      redirect: {
        name: 'ProductCategoryId'
      },
      children: [
        {
          path: '',
          name: 'ProductCategoryId',
          component: () => import('@/views/product-category/pages/details/pages/Id.vue'),
          meta: {
            hideBreadcrumbs: true
          }
        },
        {
          path: 'edit',
          name: 'ProductCategoryEdit',
          component: () => import('@/views/product-category/pages/details/pages/Edit.vue'),
          meta: {
            title: 'Edit Product Category'
          }
        }
      ]
    }
  ]
}
