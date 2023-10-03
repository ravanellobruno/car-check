<template>
  <CommonLayout title="Estabelecimentos" backLink="/vehicles">
    <AddBtn path="/companies/add" />
    <transition>
      <DeleteMultipleBtn
        v-if="checkedIds.length"
        @click.prevent="showConfirmationAlert('deleteCompanies')"
      />
    </transition>
    <NoResults v-if="!companies.length" />
    <ion-list>
      <ListItem
        v-for="company in companies"
        :key="company.id"
        :title="company.name"
        :path="`/companies/${company.id}/edit`"
        :hasEditIcon="true"
      >
        <CommonCheckbox v-model="company.isChecked" />
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
      companies: [],
    };
  },
  computed: {
    ...mapState('common', ['alerts']),

    checkedIds() {
      return this.valueHandlers_getCheckedIds(this.companies);
    },
  },
  watch: {
    'alerts.confirmation.isConfirmed': function (newValue) {
      if (newValue && this.alerts.confirmation.action === 'deleteCompanies') {
        this.proceedDeleteCompanies();
      }
    },
  },
  async ionViewWillEnter() {
    this.companies = await this.getCompanies();
  },
  methods: {
    ...mapActions('company', ['getCompanies', 'deleteCompanies']),
    ...mapActions('common', ['showCommonAlert', 'showConfirmationAlert']),

    async proceedDeleteCompanies() {
      await this.deleteCompanies(this.checkedIds);
      this.companies = await this.getCompanies();
      this.showCommonAlert('Estabelecimento(s) removido(s)');
    },
  },
};
</script>
