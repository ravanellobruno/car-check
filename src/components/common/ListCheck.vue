<template>
  <ion-item lines="none">
    <slot />
    {{ title }}
  </ion-item>
</template>

<script>
import { IonItem } from '@ionic/vue';

export default {
  components: {
    IonItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
