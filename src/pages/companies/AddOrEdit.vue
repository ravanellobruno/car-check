<template>
  <CommonLayout
    :title="`${id ? `${nameTitle} / Editar` : 'Adicionar estabelecimento'}`"
    :backLink="'/companies'"
  >
    <CommonForm @proceedAction="proceedAction">
      <TextInput
        v-model="company.name"
        label="Nome (obrigatório)"
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
      company: {},
      nameTitle: '',
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  async ionViewWillEnter() {
    this.company = {
      id: null,
      name: '',
    };

    if (this.id) {
      this.company = await this.getCompany(this.id);
      this.nameTitle = this.company.name;
    }
  },
  methods: {
    ...mapActions('company', ['getCompany', 'storeCompany', 'updateCompany']),
    ...mapActions('common', ['showCommonAlert']),

    async proceedAction() {
      this.id
        ? await this.updateCompany(this.company)
        : await this.storeCompany(this.company);

      this.showCommonAlert(
        `Estabelecimento ${this.id ? 'atualizado' : 'adicionado'}`
      );

      this.$router.push('/companies');
    },
  },
};
</script>
