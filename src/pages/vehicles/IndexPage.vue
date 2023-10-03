<template>
  <CommonLayout title="Meus veículos">
    <AddBtn path="/vehicles/add" />
    <transition>
      <DeleteMultipleBtn
        v-if="checkedIds.length"
        @click.prevent="showConfirmationAlert('deleteVehicles')"
      />
    </transition>
    <NoResults v-if="!vehicles.length" />
    <ion-list>
      <ListItem
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="vehicle.name"
        :path="`/vehicles/${vehicle.id}`"
        :hasDetail="true"
      >
        <CommonCheckbox v-model="vehicle.isChecked" />
      </ListItem>
    </ion-list>
  </CommonLayout>
</template>

<script>
import { IonList } from '@ionic/vue';
import { mapState, mapActions } from 'vuex';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  components: {
    IonList,
  },
  mixins: [valueHandlers],
  data() {
    return {
      vehicles: [],
    };
  },
  computed: {
    ...mapState('common', ['alerts']),

    checkedIds() {
      return this.valueHandlers_getCheckedIds(this.vehicles);
    },
  },
  watch: {
    'alerts.confirmation.isConfirmed': function (newValue) {
      if (newValue && this.alerts.confirmation.action === 'deleteVehicles') {
        this.proceedDeleteVehicles();
      }
    },
  },
  async ionViewWillEnter() {
    this.vehicles = await this.getVehicles();
  },
  methods: {
    ...mapActions('vehicle', ['getVehicles', 'deleteVehicles']),
    ...mapActions('common', ['showCommonAlert', 'showConfirmationAlert']),

    async proceedDeleteVehicles() {
      await this.deleteVehicles(this.checkedIds);
      this.vehicles = await this.getVehicles();
      this.showCommonAlert(`Veículo(s) removido(s)`);
    },
  },
};
</script>
