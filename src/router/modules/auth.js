export default {
  path: '/auth',
  component: () => import('@/views/auth/Auth.vue'),
  meta: {
    title: 'Auth',
    layout: 'Blank'
  },
  name: 'Auth',
  redirect: {
    name: 'LoginPage'
  },
  children: [
    {
      path: 'login',
      name: 'LoginPage',
      component: () => import('@/views/auth/pages/Login.vue'),
      meta: {
        layout: 'Blank'
      }
    }
  ]
}
