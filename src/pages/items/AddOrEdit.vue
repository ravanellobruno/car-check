<template>
  <CommonLayout
    :title="`${vehicle.name} / ${itemId ? `Editar` : 'Adicionar'} item`"
    :backLink="backLink"
  >
    <CommonForm @proceedAction="proceedAction">
      <TextInput
        v-model="item.name"
        label="Nome (obrigatório)"
        :required="true"
      />
      <TextInput v-model="item.description" label="Descrição" />
      <CommonSelect
        v-model="item.sellerId"
        label="Vendedor de preferência"
        :items="companies"
      />
      <CommonSelect
        v-model="item.garageId"
        label="Oficina de preferência"
        :items="companies"
      />
      <DateInput
        v-model="item.date"
        label="Data da última troca (obrigatório)"
        :required="true"
      />
      <NumericInput
        v-model="item.monthsNextDate"
        :max="3"
        label="Quantidade de meses para a próxima troca (obrigatório)"
        :required="true"
      />
      <NumericInput
        v-model="item.km"
        :max="8"
        label="Km da última troca (obrigatório)"
        :required="true"
      />
      <NumericInput
        v-model="item.nextKmAmount"
        :max="8"
        label="Quantidade de km para a próxima troca (obrigatório)"
        :required="true"
      />
    </CommonForm>
  </CommonLayout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      vehicle: {},
      companies: [],
      item: {},
    };
  },
  computed: {
    vehicleId() {
      return this.$route.params.vehicleId;
    },

    itemId() {
      return this.$route.params.itemId;
    },

    backLink() {
      return `/vehicles/${this.vehicleId}/items`;
    },
  },
  async ionViewWillEnter() {
    this.vehicle = await this.getVehicle(this.vehicleId);
    this.companies = await this.getCompanies();

    this.item = {
      id: null,
      name: '',
      description: '',
      sellerId: null,
      garageId: null,
      date: null,
      km: null,
      monthsNextDate: null,
      nextKmAmount: null,
      vehicleId: this.vehicleId,
    };

    if (this.itemId) {
      this.item = await this.getItem(this.itemId);
    }
  },
  methods: {
    ...mapActions('vehicle', ['getVehicle']),
    ...mapActions('company', ['getCompanies']),
    ...mapActions('common', ['showCommonAlert']),
    ...mapActions('item', ['storeItem', 'getItem', 'updateItem']),

    async proceedAction() {
      this.itemId
        ? await this.updateItem(this.item)
        : await this.storeItem(this.item);

      this.showCommonAlert(`Item ${this.itemId ? 'atualizado' : 'adicionado'}`);
      this.$router.push(this.backLink);
    },
  },
};
</script>
