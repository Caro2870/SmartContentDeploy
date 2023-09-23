export default [
  {
    path: '/client/:client_id',
    name: 'client',
    component: () => import('@/views/smart-content/clients/EditClient.vue'),
    meta: {
      pageTitle: 'Basic clients',
      breadcrumb: [
        {
          text: 'clients',
        },
        {
          text: 'Basic clients',
          active: true,
        },
      ],
    },
  },
    {
    path: '/clients/',
    name: 'clients',
    component: () => import('@/views/smart-content/clients/ListClients.vue'),
    meta: {
      pageTitle: 'Mis clientes',
      breadcrumb: [
        {
          text: 'Mis clientes',
          active: true,
        },
      ],
    },
  },

]
