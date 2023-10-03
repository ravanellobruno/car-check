<template>
  <ion-alert
    :is-open="alerts.confirmation.isVisible"
    sub-header="Tem certeza que deseja prosseguir?"
    :buttons="buttons"
    @didDismiss="hideConfirmationAlert"
  ></ion-alert>
</template>

<script>
import { IonAlert } from '@ionic/vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    IonAlert,
  },
  data() {
    return {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.hideConfirmationAlert();
          },
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.confirm();
          },
        },
      ],
    };
  },
  computed: {
    ...mapState('common', ['alerts']),
  },
  methods: {
    ...mapActions('common', ['confirm', 'hideConfirmationAlert']),
  },
};
</script>
