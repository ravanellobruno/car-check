<template>
  <CommonLayout :title="vehicle.name || ''" backLink="/vehicles">
    <ion-list>
      <ListItem
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :path="`/vehicles/${id}/${item.path}`"
        :hasDetail="true"
      >
        <ion-icon
          :color="item.icon.color"
          :size="item.icon.size"
          :icon="item.icon.name"
          class="ion-margin-end"
        ></ion-icon>
      </ListItem>
    </ion-list>
  </CommonLayout>
</template>

<script>
import { IonIcon, IonList } from '@ionic/vue';
import { mapActions } from 'vuex';
import {
  listOutline,
  pencil,
  swapHorizontalOutline,
  receiptOutline,
} from 'ionicons/icons';

export default {
  components: {
    IonIcon,
    IonList,
  },
  data() {
    return {
      vehicle: {},
      items: [
        {
          title: 'Itens de verificação',
          path: 'items',
          icon: {
            size: '',
            color: 'primary',
            name: listOutline,
          },
        },
        {
          title: 'Informar manutenção',
          path: 'maintenances/add',
          icon: {
            size: '',
            color: 'success',
            name: swapHorizontalOutline,
          },
        },
        {
          title: 'Histórico de manutenções',
          path: 'maintenances',
          icon: {
            size: '',
            color: '',
            name: receiptOutline,
          },
        },
        {
          title: 'Editar dados do veículo',
          path: 'edit',
          icon: {
            size: '',
            color: 'danger',
            name: pencil,
          },
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  async ionViewWillEnter() {
    this.vehicle = await this.getVehicle(this.id);
  },
  methods: {
    ...mapActions('vehicle', ['getVehicle']),
  },
};
</script>
