<template>
  <ion-buttons class="menu-btn-wrapper">
    <ion-menu-button>
      <ion-icon :icon="menu"></ion-icon>
    </ion-menu-button>
  </ion-buttons>
  <ion-menu content-id="main-content">
    <ion-header class="ion-margin-bottom">
      <ion-toolbar>
        <ion-title>
          <h6 class="page-title">Menu</h6>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ListItem
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :path="item.path"
          :hasDetail="true"
          @click="hideMenu"
        />
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import { menu } from 'ionicons/icons';
import {
  IonMenu,
  IonMenuButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  menuController,
  IonContent,
  IonIcon,
} from '@ionic/vue';

export default {
  components: {
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonContent,
    IonIcon,
  },
  data() {
    return {
      menu,
      items: [
        {
          title: 'Meus veículos',
          path: '/vehicles',
        },
        {
          title: 'Estabelecimentos',
          path: '/companies',
        },
      ],
    };
  },
  methods: {
    hideMenu() {
      menuController.close();
    },
  },
};
</script>
