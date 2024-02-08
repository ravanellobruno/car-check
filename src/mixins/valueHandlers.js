import moment from 'moment';

export default {
  methods: {
    valueHandlers_getCopy(value) {
      return JSON.parse(JSON.stringify(value));
    },

    valueHandlers_getCheckedIds(elements) {
      const checkedElements = elements.filter((el) => el.isChecked);
      return checkedElements.map((el) => el.id);
    },

    valueHandlers_formatKm(value) {
      if (!value) {
        return value;
      }

      value = `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} km`;

      return value.replace('-', '');
    },

    valueHandlers_formatDate(value) {
      return moment(value).format('DD/MM/YYYY');
    },
  },
};
