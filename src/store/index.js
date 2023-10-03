import { createStore } from 'vuex';
import vehicle from '@/store/modules/vehicle.js';
import company from '@/store/modules/company.js';
import common from '@/store/modules/common.js';
import item from '@/store/modules/item.js';
import maintenance from '@/store/modules/maintenance.js';

const store = createStore({
  modules: { vehicle, company, common, item, maintenance },
});

export default store;
