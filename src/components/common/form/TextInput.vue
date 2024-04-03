<template>
  <ion-input
    value="value"
    :label="label"
    :required="required"
    label-placement="floating"
    type="text"
    :maxlength="max"
    @input="$emit('input')"
  />
</template>

<script>
import { IonInput } from '@ionic/vue';

export default {
  components: {
    IonInput,
  },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      default: 80,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
