<template>
  <ion-alert
    :is-open="alerts.vehicleKm.isVisible"
    :sub-header="subHeader"
    :buttons="buttons"
    @didDismiss="hideVehicleKmAlert"
  ></ion-alert>
</template>

<script>
import { IonAlert } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  components: {
    IonAlert,
  },
  mixins: [valueHandlers],
  data() {
    return {
      buttons: [
        {
          text: 'Manter',
          role: 'cancel',
          handler: () => {
            this.hideVehicleKmAlert();
          },
        },
        {
          text: 'Alterar',
          role: 'confirm',
          handler: () => {
            this.$router.push(
              `/vehicles/${this.vehicle.id}/edit?isKmUpdate=true`
            );
          },
        },
      ],
    };
  },
  computed: {
    ...mapState('common', ['alerts']),

    vehicle() {
      return this.alerts.vehicleKm.vehicle;
    },

    subHeader() {
      return `A km atual do veículo ${
        this.vehicle.name
      } é ${this.valueHandlers_formatKm(this.vehicle.km)}. Deseja atualizar?`;
    },
  },
  methods: {
    ...mapActions('common', ['hideVehicleKmAlert']),
  },
};
</script>
