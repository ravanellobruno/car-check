<template>
  <ion-input
    value="value"
    :label="label"
    label-placement="floating"
    type="date"
    maxlength="10"
    :required="required"
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
      type: Date,
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
