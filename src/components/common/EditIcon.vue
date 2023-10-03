<template>
  <ion-icon slot="end" :icon="createOutline"></ion-icon>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import { createOutline } from 'ionicons/icons';

export default {
  components: {
    IonIcon,
  },
  data() {
    return {
      createOutline,
    };
  },
};
</script>
