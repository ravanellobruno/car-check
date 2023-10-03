import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  //companies
  {
    name: 'companies',
    path: '/companies',
    component: () => import('@/pages/companies/IndexPage.vue'),
  },
  {
    name: 'companiesAdd',
    path: '/companies/add',
    component: () => import('@/pages/companies/AddOrEdit.vue'),
  },
  {
    name: 'companiesEdit',
    path: '/companies/:id/edit',
    component: () => import('@/pages/companies/AddOrEdit.vue'),
  },

  //vehicles
  {
    name: 'home',
    path: '/',
    redirect: '/vehicles',
  },
  {
    name: 'vehicles',
    path: '/vehicles',
    component: () => import('@/pages/vehicles/IndexPage.vue'),
  },
  {
    name: 'vehiclesMenu',
    path: '/vehicles/:id',
    component: () => import('@/pages/vehicles/MenuPage.vue'),
  },
  {
    name: 'vehiclesAdd',
    path: '/vehicles/add',
    component: () => import('@/pages/vehicles/AddOrEdit.vue'),
  },
  {
    name: 'vehiclesEdit',
    path: '/vehicles/:id/edit',
    component: () => import('@/pages/vehicles/AddOrEdit.vue'),
  },

  //items
  {
    name: 'items',
    path: '/vehicles/:vehicleId/items',
    component: () => import('@/pages/items/IndexPage.vue'),
  },
  {
    name: 'itemsAdd',
    path: '/vehicles/:vehicleId/items/add',
    component: () => import('@/pages/items/AddOrEdit.vue'),
  },
  {
    name: 'itemsEdit',
    path: '/vehicles/:vehicleId/items/:itemId/edit',
    component: () => import('@/pages/items/AddOrEdit.vue'),
  },

  //maintenances
  {
    name: 'maintenances',
    path: '/vehicles/:vehicleId/maintenances',
    component: () => import('@/pages/maintenances/IndexPage.vue'),
  },
  {
    name: 'maintenancesAdd',
    path: '/vehicles/:vehicleId/maintenances/add',
    component: () => import('@/pages/maintenances/AddOrEdit.vue'),
  },
  {
    name: 'maintenancesEdit',
    path: '/vehicles/:vehicleId/maintenances/:maintenanceId/edit',
    component: () => import('@/pages/maintenances/AddOrEdit.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
