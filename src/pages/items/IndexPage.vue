<template>
  <CommonLayout
    :title="`${vehicle.name || ''} (${currentVehicleKm}) / Itens`"
    :backLink="vehiclePath"
  >
    <AddBtn :path="`${vehiclePath}/items/add`" />
    <transition>
      <DeleteMultipleBtn
        v-if="checkedIds.length"
        @click.prevent="showConfirmationAlert('deleteItems')"
      />
    </transition>
    <NoResults v-if="!items.length" />
    <ion-list>
      <ListItem
        v-for="item in items"
        :key="item.id"
        title=""
        :path="`${vehiclePath}/items/${item.id}/edit`"
        :hasDetail="true"
      >
        <CommonCheckbox v-model="item.isChecked" />
        <table>
          <tr>
            <p class="item-title">{{ item.name }}</p>
          </tr>
          <tr>
            <td :class="`${item.dateWarn.color}-warn-text`">
              <p class="item-subtitle">Data próx. troca:</p>
              <b>{{ item.formatedNextDate }}</b>
            </td>
            <td :class="`${item.kmWarn.color}-warn-text`">
              <p class="item-subtitle">Km próx. troca:</p>
              <b>{{ item.formatedNextKm }}</b>
            </td>
          </tr>
          <tr>
            <td :class="`${item.dateWarn.color}-warn-text`">
              <p class="warn-text">{{ item.dateWarn.text }}</p>
            </td>
            <td :class="`${item.kmWarn.color}-warn-text`">
              <p class="warn-text">{{ item.kmWarn.text }}</p>
            </td>
          </tr>
        </table>
      </ListItem>
    </ion-list>
  </CommonLayout>
</template>

<script>
import { IonList } from '@ionic/vue';
import { mapState, mapActions } from 'vuex';
import valueHandlers from '@/mixins/valueHandlers';
import moment from 'moment';

export default {
  components: {
    IonList,
  },
  mixins: [valueHandlers],
  data() {
    return {
      vehicle: {},
      items: [],
    };
  },
  computed: {
    ...mapState('common', ['alerts']),

    vehicleId() {
      return this.$route.params.vehicleId;
    },

    checkedIds() {
      return this.valueHandlers_getCheckedIds(this.items);
    },

    vehiclePath() {
      return `/vehicles/${this.vehicleId}`;
    },

    currentVehicleKm() {
      return this.vehicle.km
        ? this.valueHandlers_formatKm(this.vehicle.km)
        : '';
    },
  },
  watch: {
    'alerts.confirmation.isConfirmed': function (newValue) {
      if (newValue && this.alerts.confirmation.action === 'deleteItems') {
        this.proceedDeleteItems();
      }
    },
  },
  async ionViewWillEnter() {
    this.vehicle = await this.getVehicle(this.vehicleId);
    await this.proceedGetItems();

    if (this.$router.options.history.state.back === this.vehiclePath) {
      this.showVehicleKmAlert(this.vehicle);
    }
  },
  methods: {
    ...mapActions('item', ['deleteItems', 'getItems']),
    ...mapActions('common', [
      'showCommonAlert',
      'showConfirmationAlert',
      'showVehicleKmAlert',
    ]),
    ...mapActions('vehicle', ['getVehicle']),

    getNextDate(value, months) {
      return moment(value).add(months, 'months');
    },

    getDateWarn(date, months) {
      const start = moment();
      const end = this.getNextDate(date, months);
      let daysCount = end.diff(start, 'days') + (start >= end ? 0 : 1);

      if (daysCount > 0) {
        return {
          text: `Falta(m) ${daysCount} dia(s)`,
          color: daysCount < 32 ? 'orange' : '',
        };
      } else if (daysCount === 0) {
        return {
          text: 'Vence hoje',
          color: 'red',
        };
      } else {
        daysCount = daysCount * -1;

        return {
          text: `Venceu a ${daysCount} dia(s)`,
          color: 'red',
        };
      }
    },

    getKmWarn(km, vehicleKm) {
      if (!vehicleKm) {
        return {
          text: '',
          color: '',
        };
      }

      const kmCount = parseInt(km) - parseInt(vehicleKm);

      if (kmCount === 0) {
        return {
          text: 'Vence hoje',
          color: 'red',
        };
      } else if (kmCount < 0) {
        return {
          text: `Venceu a ${this.valueHandlers_formatKm(kmCount)}`,
          color: 'red',
        };
      } else {
        return {
          text: `Falta(m) ${this.valueHandlers_formatKm(kmCount)}`,
          color: kmCount < 51 ? 'orange' : '',
        };
      }
    },

    async proceedGetItems() {
      this.items = await this.getItems(this.vehicleId);

      this.items.forEach((el) => {
        const nextKm = parseInt(el.km) + parseInt(el.nextKmAmount);
        el.formatedNextKm = this.valueHandlers_formatKm(nextKm);

        el.formatedNextDate = this.valueHandlers_formatDate(
          this.getNextDate(el.date, el.monthsNextDate)
        );

        el.dateWarn = this.getDateWarn(el.date, el.monthsNextDate);
        el.kmWarn = this.getKmWarn(nextKm, this.vehicle.km);
      });
    },

    async proceedDeleteItems() {
      await this.deleteItems(this.checkedIds);
      await this.proceedGetItems();
      this.showCommonAlert('Item(s) removido(s)');
    },
  },
};
</script>
