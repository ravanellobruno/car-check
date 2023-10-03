import storage from '@/services/storage.js';

const storageKey = 'maintenances';

export default {
  namespaced: true,
  actions: {
    async getMaintenances(context, vehicleId) {
      const parent = {
        idProp: 'vehicleId',
        id: vehicleId,
      };

      const orderBy = {
        isDate: true,
        prop: 'date',
        order: 'desc',
      };

      return await storage.getRegisters(storageKey, parent, orderBy);
    },

    async getMaintenance(context, id) {
      return await storage.getRegister(storageKey, id);
    },

    async updateVehicleAndItems(context, data) {
      const { itemsToUpdate, vehicleToUpdate } = data;

      itemsToUpdate.length &&
        (await storage.updateRegisters('items', itemsToUpdate));

      Object.keys(vehicleToUpdate).length &&
        (await storage.updateRegister('vehicles', vehicleToUpdate));
    },

    async storeMaintenance({ dispatch }, data) {
      await storage.storeRegister(storageKey, data.maintenance);
      await dispatch('updateVehicleAndItems', data);
    },

    async updateMaintenance({ dispatch }, data) {
      await storage.updateRegister(storageKey, data.maintenance);
      await dispatch('updateVehicleAndItems', data);
    },

    async deleteMaintenances(context, ids) {
      await storage.deleteRegisters(storageKey, ids);
    },
  },
};
