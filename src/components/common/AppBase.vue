<template>
  <CommonAlert />
  <ConfirmationAlert />
  <VehicleKmAlert />
  <MenuLeft />
  <ion-content id="main-content">
    <slot />
  </ion-content>
</template>

<script>
import { mapState } from 'vuex';
import { IonContent } from '@ionic/vue';

export default {
  components: {
    IonContent,
  },
  computed: {
    ...mapState('common', ['alerts']),
  },
};
</script>
