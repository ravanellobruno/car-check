<template>
  <ion-alert
    :is-open="alerts.common.isVisible"
    :sub-header="alerts.common.text"
    :buttons="['OK']"
    @didDismiss="hideCommonAlert"
  ></ion-alert>
</template>

<script>
import { IonAlert } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    IonAlert,
  },
  computed: {
    ...mapState('common', ['alerts']),
  },
  methods: {
    ...mapActions('common', ['hideCommonAlert']),
  },
};
</script>
