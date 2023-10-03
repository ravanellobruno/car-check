<template>
  <ion-item :detail="hasDetail" lines="none" button :router-link="path">
    <slot />
    {{ title }}
    <EditIcon v-if="hasEditIcon" />
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
    path: {
      type: String,
      required: true,
    },
    hasDetail: {
      type: Boolean,
      default: false,
    },
    hasEditIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
