export default {
  namespaced: true,
  state: {
    alerts: {
      common: {
        isVisible: false,
        text: '',
      },
      confirmation: {
        isVisible: false,
        isConfirmed: false,
        action: '',
      },
      vehicleKm: {
        isVisible: false,
        vehicle: {},
      },
    },
  },
  mutations: {
    SET_COMMON_ALERT(state, data) {
      state.alerts.common = { ...state.alerts.common, ...data };
    },

    SET_CONFIRMATION_ALERT(state, data) {
      state.alerts.confirmation = { ...state.alerts.confirmation, ...data };
    },

    SET_VEHICLE_KM_ALERT(state, data) {
      state.alerts.vehicleKm = { ...state.alerts.vehicleKm, ...data };
    },
  },
  actions: {
    showCommonAlert({ commit }, text) {
      commit('SET_COMMON_ALERT', { isVisible: true, text });
    },

    hideCommonAlert({ commit }) {
      commit('SET_COMMON_ALERT', { isVisible: false });
    },

    showConfirmationAlert({ commit }, action) {
      commit('SET_CONFIRMATION_ALERT', {
        isVisible: true,
        isConfirmed: false,
        action,
      });
    },

    confirm({ commit }) {
      commit('SET_CONFIRMATION_ALERT', {
        isVisible: false,
        isConfirmed: true,
      });
    },

    hideConfirmationAlert({ commit }) {
      commit('SET_CONFIRMATION_ALERT', { isVisible: false });
    },

    showVehicleKmAlert({ commit }, vehicle) {
      commit('SET_VEHICLE_KM_ALERT', { isVisible: true, vehicle });
    },

    hideVehicleKmAlert({ commit }) {
      commit('SET_VEHICLE_KM_ALERT', { isVisible: false });
    },
  },
};
