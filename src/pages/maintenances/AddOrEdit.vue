<template>
  <CommonLayout :title="title" :backLink="backLink">
    <CommonForm @proceedAction="proceedAction">
      <DateInput
        v-model="maintenance.date"
        label="Data (obrigatório)"
        :required="true"
      />
      <NumericInput
        v-model="maintenance.km"
        :max="8"
        label="Km (obrigatório)"
        :required="true"
      />
      <ListCheck title="Foi feita revisão do veículo junto a manutenção?">
        <CommonCheckbox slot="end" v-model="maintenance.hasCheckup" />
      </ListCheck>
      <p class="checkboxes-title">
        {{
          items.length
            ? 'Selecione os itens que foram substituídos:'
            : 'Não existem itens registrados para esse veículo'
        }}
      </p>
      <ion-list>
        <ListCheck v-for="item in items" :key="item.id" :title="item.name">
          <CommonCheckbox slot="end" v-model="item.isChecked" />
        </ListCheck>
      </ion-list>
      <ListCheck
        v-if="items.length"
        class="ion-margin-bottom ion-margin-top"
        title="Atualizar os itens selecionados acima?"
      >
        <CommonCheckbox
          slot="end"
          v-model="maintenance.isSelectedItemsToUpdate"
        />
      </ListCheck>
      <ListCheck
        class="ion-margin-bottom ion-margin-top"
        title="Atualizar o veículo?"
      >
        <CommonCheckbox slot="end" v-model="maintenance.isVehicleToUpdate" />
      </ListCheck>
    </CommonForm>
  </CommonLayout>
</template>

<script>
import { mapActions } from 'vuex';
import { IonList } from '@ionic/vue';
import moment from 'moment';
import valueHandlers from '@/mixins/valueHandlers';

export default {
  components: {
    IonList,
  },
  mixins: [valueHandlers],
  data() {
    return {
      vehicle: {},
      items: [],
      maintenance: {},
    };
  },
  computed: {
    vehicleId() {
      return this.$route.params.vehicleId;
    },

    maintenanceId() {
      return this.$route.params.maintenanceId;
    },

    title() {
      return `${this.vehicle.name} / ${
        this.maintenanceId ? `Editar` : 'Informar'
      } manutenção`;
    },

    backLink() {
      return `/vehicles/${this.vehicleId}/maintenances`;
    },
  },
  async ionViewWillEnter() {
    this.vehicle = await this.getVehicle(this.vehicleId);
    this.items = await this.getItems(this.vehicleId);

    this.maintenance = {
      id: null,
      date: moment().format('YYYY-MM-DD'),
      km: null,
      hasCheckup: false,
      vehicleId: this.vehicleId,
      isVehicleToUpdate: true,
      isSelectedItemsToUpdate: !!this.items.length,
    };

    this.maintenanceId && (await this.proceedGetMaintenance());
  },
  methods: {
    ...mapActions('vehicle', ['getVehicle']),
    ...mapActions('item', ['getItems']),
    ...mapActions('maintenance', [
      'storeMaintenance',
      'getMaintenance',
      'updateMaintenance',
    ]),
    ...mapActions('common', ['showCommonAlert']),

    async proceedGetMaintenance() {
      this.maintenance = await this.getMaintenance(this.maintenanceId);

      this.items.forEach((item) => {
        this.maintenance.items.forEach((maintenanceItem) => {
          if (item.name.trim() === maintenanceItem.trim()) {
            item.isChecked = true;
          }
        });
      });
    },

    getMaintenanceData() {
      const checkedItems = this.items.filter((item) => item.isChecked);

      this.maintenance.items = checkedItems.map(
        (checkedItem) => checkedItem.name
      );

      return this.maintenance;
    },

    getItemsToUpdateData() {
      const itemsToUpdate = [];
      const itemsCopy = this.valueHandlers_getCopy(this.items);

      if (this.maintenance.isSelectedItemsToUpdate) {
        itemsCopy.forEach((item) => {
          if (item.isChecked) {
            item.date = this.maintenance.date;
            item.km = this.maintenance.km;
            delete item.isChecked;
            itemsToUpdate.push(item);
          }
        });
      }

      return itemsToUpdate;
    },

    getVehicleToUpdateData() {
      let vehicleToUpdate = {};

      if (this.maintenance.isVehicleToUpdate) {
        this.vehicle.km = this.maintenance.km;
        vehicleToUpdate = this.vehicle;
      }

      return vehicleToUpdate;
    },

    async proceedAction() {
      const data = {
        maintenance: this.getMaintenanceData(),
        itemsToUpdate: this.getItemsToUpdateData(),
        vehicleToUpdate: this.getVehicleToUpdateData(),
      };

      this.maintenanceId
        ? await this.updateMaintenance(data)
        : await this.storeMaintenance(data);

      this.showCommonAlert(
        `Manutenção ${this.maintenanceId ? 'atualizada' : 'adicionada'}`
      );

      this.$router.push(this.backLink);
    },
  },
};
</script>
