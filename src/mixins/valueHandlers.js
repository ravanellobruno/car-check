import moment from 'moment';

export default {
  methods: {
    valueHandlers_getCopy(value) {
      return JSON.parse(JSON.stringify(value));
    },

    valueHandlers_getCheckedIds(registers) {
      const checkedRegisters = registers.filter(
        (register) => register.isChecked
      );

      return checkedRegisters.map((register) => register.id);
    },

    valueHandlers_formatKm(km) {
      if (!km) {
        return km;
      }

      km = `${km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} km`;

      return km.replace('-', '');
    },

    valueHandlers_formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
};
