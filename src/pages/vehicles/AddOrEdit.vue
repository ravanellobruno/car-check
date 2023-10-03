<template>
  <CommonLayout
    :title="`${id ? `${nameTitle} / Editar` : 'Adicionar veículo'}`"
    :backLink="backLink"
  >
    <CommonForm @proceedAction="proceedAction">
      <TextInput
        v-show="!isKmUpdate"
        v-model="vehicle.name"
        label="Nome (obrigatório)"
        :required="true"
      />
      <NumericInput
        v-model="vehicle.km"
        :max="8"
        label="Km atual (obrigatório)"
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
      nameTitle: '',
      isKmUpdate: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },

    backLink() {
      return `/vehicles/${this.id || ''}${this.isKmUpdate ? '/items' : ''}`;
    },
  },
  async ionViewWillEnter() {
    this.isKmUpdate = this.$route.query.isKmUpdate;

    this.vehicle = {
      id: null,
      name: '',
      km: null,
    };

    if (this.id) {
      this.vehicle = await this.getVehicle(this.id);
      this.nameTitle = this.vehicle.name;
    }
  },
  ionViewDidLeave() {
    this.isKmUpdate = false;
  },
  methods: {
    ...mapActions('vehicle', ['storeVehicle', 'getVehicle', 'updateVehicle']),
    ...mapActions('common', ['showCommonAlert']),

    async proceedAction() {
      this.id
        ? await this.updateVehicle(this.vehicle)
        : await this.storeVehicle(this.vehicle);

      this.showCommonAlert(`Veículo ${this.id ? 'atualizado' : 'adicionado'}`);
      this.$router.push(this.backLink);
    },
  },
};
</script>
