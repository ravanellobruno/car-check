import storage from '@/services/storage.js';

const storageKey = 'vehicles';

export default {
  namespaced: true,
  actions: {
    async getVehicles() {
      return await storage.getRegisters(storageKey);
    },

    async getVehicle(context, id) {
      return await storage.getRegister(storageKey, id);
    },

    async storeVehicle(context, data) {
      await storage.storeRegister(storageKey, data);
    },

    async updateVehicle(context, data) {
      await storage.updateRegister(storageKey, data);
    },

    async deleteVehicles(context, ids) {
      const childs = {
        storageKeys: ['items', 'maintenances'],
        parentIdProp: 'vehicleId',
      };

      await storage.deleteRegisters(storageKey, ids, childs);
    },
  },
};
