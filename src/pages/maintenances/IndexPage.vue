<template>
  <CommonLayout
    :title="`${vehicle.name || ''} / Histórico de manutenções`"
    :backLink="vehiclePath"
  >
    <AddBtn :path="`${vehiclePath}/maintenances/add`" />
    <transition>
      <DeleteMultipleBtn
        v-if="checkedIds.length"
        @click.prevent="showConfirmationAlert('deleteMaintenances')"
      />
    </transition>
    <NoResults v-if="!maintenances.length" />
    <ion-list>
      <ListItem
        v-for="maintenance in maintenances"
        :key="maintenance.id"
        title=""
        :path="`${vehiclePath}/maintenances/${maintenance.id}/edit`"
        :hasEditIcon="true"
      >
        <CommonCheckbox v-model="maintenance.isChecked" />
        <table>
          <tr>
            <td>
              <small>Data:</small>
              <b class="display-block">
                {{ valueHandlers_formatDate(maintenance.date) }}
              </b>
            </td>
            <td>
              <small>Km:</small>
              <b class="display-block">
                {{ valueHandlers_formatKm(maintenance.km) }}
              </b>
            </td>
          </tr>
          <tr>
            <td class="verification-text">
              <small v-if="maintenance.hasCheckup">
                <ion-icon
                  class="check-icon"
                  :icon="checkmarkOutline"
                ></ion-icon>
                Veículo revisado
              </small>
              <small v-else>Veículo não revisado</small>
            </td>
          </tr>
          <tr class="maintenance-list">
            <ul>
              <small>
                {{
                  maintenance.items.length
                    ? 'Itens substituídos:'
                    : 'Nenhum item foi substituído'
                }}
              </small>
              <li v-for="(item, index) in maintenance.items" :key="index">
                {{ item }}
              </li>
            </ul>
          </tr>
        </table>
      </ListItem>
    </ion-list>
  </CommonLayout>
</template>

<script>
import { IonList, IonIcon } from '@ionic/vue';
import { mapState, mapActions } from 'vuex';
import valueHandlers from '@/mixins/valueHandlers';
import { checkmarkOutline } from 'ionicons/icons';

export default {
  components: {
    IonList,
    IonIcon,
  },
  mixins: [valueHandlers],
  data() {
    return {
      vehicle: {},
      maintenances: [],
      checkmarkOutline,
    };
  },
  computed: {
    ...mapState('common', ['alerts']),

    vehicleId() {
      return this.$route.params.vehicleId;
    },

    checkedIds() {
      return this.valueHandlers_getCheckedIds(this.maintenances);
    },

    vehiclePath() {
      return `/vehicles/${this.vehicleId}`;
    },
  },
  watch: {
    'alerts.confirmation.isConfirmed': function (newValue) {
      const action = this.alerts.confirmation.action;

      if (newValue && action === 'deleteMaintenances') {
        this.proceedDeleteMaintenances();
      }
    },
  },
  async ionViewWillEnter() {
    this.vehicle = await this.getVehicle(this.vehicleId);
    this.maintenances = await this.getMaintenances(this.vehicleId);
  },
  methods: {
    ...mapActions('maintenance', ['getMaintenances', 'deleteMaintenances']),
    ...mapActions('common', ['showCommonAlert', 'showConfirmationAlert']),
    ...mapActions('vehicle', ['getVehicle']),

    async proceedDeleteMaintenances() {
      await this.deleteMaintenances(this.checkedIds);
      this.maintenances = await this.getMaintenances(this.vehicleId);
      this.showCommonAlert(`Manutenção(s) removida(s)`);
    },
  },
};
</script>
