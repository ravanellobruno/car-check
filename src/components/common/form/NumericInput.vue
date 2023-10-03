<template>
  <ion-input
    value="value"
    :label="label"
    type="text"
    label-placement="floating"
    :maxLength="max"
    inputmode="numeric"
    :required="required"
    @input="$emit('input')"
    oninput="this.value = this.value.replace(/\D+/g, '')"
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
      type: Number,
    },
    max: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
