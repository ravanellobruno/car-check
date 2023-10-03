import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import '@/theme/common.css';

import AppBase from '@/components/common/AppBase.vue';
import CommonLayout from '@/components/common/CommonLayout.vue';
import NoResults from '@/components/common/NoResults.vue';
import ListItem from '@/components/common/ListItem.vue';
import ListCheck from '@/components/common/ListCheck.vue';
import AddBtn from '@/components/common/btns/AddBtn.vue';
import DeleteMultipleBtn from '@/components/common/btns/DeleteMultipleBtn.vue';
import SaveBtn from '@/components/common/btns/SaveBtn.vue';
import CommonAlert from '@/components/common/alerts/CommonAlert.vue';
import ConfirmationAlert from '@/components/common/alerts/ConfirmationAlert.vue';
import DateInput from '@/components/common/form/DateInput.vue';
import NumericInput from '@/components/common/form/NumericInput.vue';
import CommonSelect from '@/components/common/form/CommonSelect.vue';
import TextInput from '@/components/common/form/TextInput.vue';
import CommonCheckbox from '@/components/common/form/CommonCheckbox.vue';
import EditIcon from '@/components/common/EditIcon.vue';
import MenuLeft from '@/components/common/MenuLeft.vue';
import VehicleKmAlert from '@/components/common/alerts/VehicleKmAlert.vue';
import CommonForm from '@/components/common/form/CommonForm.vue';

const app = createApp(App);
app.use(IonicVue);
app.use(router);
app.use(store);

router.isReady().then(() => {
  app.mount('#app');
});

app.component('AppBase', AppBase);
app.component('CommonLayout', CommonLayout);
app.component('NoResults', NoResults);
app.component('ListItem', ListItem);
app.component('ListCheck', ListCheck);
app.component('AddBtn', AddBtn);
app.component('DeleteMultipleBtn', DeleteMultipleBtn);
app.component('SaveBtn', SaveBtn);
app.component('CommonAlert', CommonAlert);
app.component('ConfirmationAlert', ConfirmationAlert);
app.component('DateInput', DateInput);
app.component('NumericInput', NumericInput);
app.component('CommonSelect', CommonSelect);
app.component('TextInput', TextInput);
app.component('CommonCheckbox', CommonCheckbox);
app.component('EditIcon', EditIcon);
app.component('MenuLeft', MenuLeft);
app.component('VehicleKmAlert', VehicleKmAlert);
app.component('CommonForm', CommonForm);
