import storage from '@/services/storage.js';

const storageKey = 'companies';

export default {
  namespaced: true,
  actions: {
    async getCompanies() {
      return await storage.getRegisters(storageKey);
    },

    async getCompany(context, id) {
      return await storage.getRegister(storageKey, id);
    },

    async storeCompany(context, data) {
      await storage.storeRegister(storageKey, data);
    },

    async updateCompany(context, data) {
      await storage.updateRegister(storageKey, data);
    },

    async deleteCompanies(context, ids) {
      await storage.deleteRegisters(storageKey, ids);
    },
  },
};
