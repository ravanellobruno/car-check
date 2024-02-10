import { Storage } from '@ionic/storage';
const ionicStorage = new Storage({ name: 'carCheckDb' });
ionicStorage.create();

let storageKey = '';
let registers = [];

export default {
  async init(target) {
    storageKey = target;
    const jsonRegisters = await ionicStorage.get(storageKey);
    registers = JSON.parse(jsonRegisters) || [];
  },

  async setRegisters(data) {
    await ionicStorage.set(storageKey, JSON.stringify(data));
  },

  filterRegistersByParent(parent) {
    registers = registers.filter(
      (register) => register[parent.idProp] === parent.id
    );
  },

  reorderRegisters(orderBy) {
    registers.sort((valueA, valueB) => {
      let a = valueA[orderBy.prop];
      let b = valueB[orderBy.prop];

      if (orderBy.isDate) {
        a = Date.parse(a);
        b = Date.parse(b);
      }

      return orderBy.order === 'desc' ? b - a : b + a;
    });
  },

  async getRegisters(target, parent = null, orderBy = null) {
    await this.init(target);
    parent && this.filterRegistersByParent(parent);
    orderBy && this.reorderRegisters(orderBy);
    return registers;
  },

  async getRegister(target, id) {
    await this.init(target);
    return registers.filter((register) => register.id === parseInt(id))[0];
  },

  async storeRegister(target, data) {
    await this.init(target);
    data.id = registers.length ? registers[registers.length - 1].id + 1 : 1;
    await this.setRegisters([...registers, data]);
  },

  async updateRegister(target, data) {
    await this.init(target);
    const index = registers.findIndex((register) => register.id === data.id);
    registers[index] = data;
    await this.setRegisters(registers);
  },

  async updateRegisters(target, elements) {
    for await (const el of elements) {
      await this.updateRegister(target, el);
    }
  },

  async deleteChilds(childs, id) {
    const { parentIdProp, storageKeys } = childs;

    for await (const target of storageKeys) {
      await this.init(target);

      await this.setRegisters(
        registers.filter((register) => parseInt(register[parentIdProp]) !== id)
      );
    }
  },

  async deleteRegister(target, id, childs = null) {
    await this.init(target);
    await this.setRegisters(registers.filter((register) => register.id !== id));
    childs && (await this.deleteChilds(childs, id));
  },

  async deleteRegisters(target, ids, childs = null) {
    for await (const id of ids) {
      await this.deleteRegister(target, id, childs);
    }
  },
};
