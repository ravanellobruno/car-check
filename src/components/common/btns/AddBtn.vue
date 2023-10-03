<template>
  <ion-button class="add-btn btn" :router-link="path">+ Adicionar</ion-button>
</template>

<script>
import { IonButton } from '@ionic/vue';

export default {
  components: {
    IonButton,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
};
</script>
