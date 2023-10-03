<template>
  <ion-checkbox
    class="list-checkbox"
    aria-label=""
    @input="$emit('input')"
    @click.stop
  ></ion-checkbox>
</template>

<script>
import { IonCheckbox } from '@ionic/vue';

export default {
  components: {
    IonCheckbox,
  },
  props: {
    value: {
      type: Date,
    },
  },
};
</script>
