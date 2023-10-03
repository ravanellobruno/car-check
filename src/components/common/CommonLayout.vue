<template>
  <ion-page>
    <ion-header class="ion-margin-bottom">
      <ion-toolbar>
        <ion-title>
          <h6 class="page-title">{{ title }}</h6>
        </ion-title>
        <ion-button
          v-if="backLink"
          fill="clear"
          size="small"
          slot="end"
          :router-link="backLink"
        >
          <ion-icon size="large" :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot />
      <div class="layout-bottom"></div>
    </ion-content>
  </ion-page>
</template>

<script>
import { arrowBack } from 'ionicons/icons';
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonButton,
    IonIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    backLink: {
      type: String,
    },
  },
  data() {
    return {
      arrowBack,
    };
  },
};
</script>
