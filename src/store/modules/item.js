import storage from '@/services/storage.js';

const storageKey = 'items';

export default {
  namespaced: true,
  actions: {
    async getItems(context, vehicleId) {
      const parent = {
        idProp: 'vehicleId',
        id: vehicleId,
      };

      return await storage.getRegisters(storageKey, parent);
    },

    async getItem(context, id) {
      return await storage.getRegister(storageKey, id);
    },

    async storeItem(context, data) {
      await storage.storeRegister(storageKey, data);
    },

    async updateItem(context, data) {
      await storage.updateRegister(storageKey, data);
    },

    async deleteItems(context, ids) {
      await storage.deleteRegisters(storageKey, ids);
    },
  },
};
