<template>
  <ion-select
    value="value"
    :aria-label="label"
    :placeholder="label"
    :required="required"
    @input="$emit('input')"
  >
    <ion-select-option :value="null">Nenhum</ion-select-option>
    <ion-select-option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </ion-select-option>
  </ion-select>
</template>

<script>
import { IonSelect, IonSelectOption } from '@ionic/vue';

export default {
  components: {
    IonSelect,
    IonSelectOption,
  },
  props: {
    value: {
      type: Number,
    },
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
