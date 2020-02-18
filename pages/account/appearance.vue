<template>
  <div>
    <h1 class="title title-appearance">
      {{ $t('appearance') }}
    </h1>
    <table class="table-appearance">
      <tbody>
        <tr>
          <td
            align="center"
            width="75"
            height="75"
            background="/media/map/day/grass_0.png"
          >
            <img
              class="perso-images"
              type="image"
              :src="selectedImage"
              border="0"
            >
          </td>
          <td
            align="center"
            width="10"
            height="75"
          />
          <td
            align="center"
            width="75"
            height="75"
            background="/media/map/day/sand_0.png"
          >
            <img
              class="perso-images"
              type="image"
              :src="selectedImage"
              border="0"
            >
          </td>
          <td
            align="center"
            width="10"
            height="75"
          />
          <td
            align="center"
            width="75"
            height="75"
            background="/media/map/day/ground_0.png"
          >
            <img
              class="perso-images"
              type="image"
              :src="selectedImage"
              border="0"
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <b-form-select
        v-if="player_race !== null"
        v-model="player_appearance.type"
        :placeholder="$t('choice.character')"
        clearable
        required
      >
        <b-form-select-option
          v-for="(value, key) in appearances[player_race]"
          :key="key"
          :value="key"
        >
          {{ value.label }}
        </b-form-select-option>
      </b-form-select>

      <b-form-select
        v-if="player_appearance.type !== null && appearances[player_race]"
        v-model="player_appearance.image"
        required
      >
        <b-form-select-option
          v-for="(value, key) in appearances[player_race][player_appearance.type].value"
          :key="key"
          :value="value"
        >
          {{ key }}
        </b-form-select-option>
      </b-form-select>

      <b-button
        variant="primary"
        @click.prevent="handleSubmit()"
        block
      >
        {{ $t('save') }}
      </b-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {entries} from '~/lib/utils';
  import api from '~/services/api';

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.$t('account.title'),
      };
    },
    data() {
      return {
        player_race: null,
        player_appearance: {
          type: null,
          image: null,
        },
        appearances: {},
      };
    },
    asyncData() {
      return api.getAppearanceData().then((res) => (
        {
          appearances: res.data,
        }
      )).catch(() => {});
    },
    mounted() {
      this.player_race = this.currentPlayer.race.id;
      this.player_appearance.image = this.currentPlayer.image;

      /* eslint-disable no-restricted-syntax */
      for (const [type, data] of entries(this.appearances[this.player_race])) {
        if (Object.values(data.value).indexOf(this.currentPlayer.image) !== -1) {
          this.player_appearance.type = type;
          break;
        }
      }
      /* eslint-enable no-restricted-syntax */
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
      selectedImage() {
        return `/images/avatars/players/${this.player_appearance.image}`;
      },
    },
    methods: {
      handleSubmit() {
        const data = {
          player_registration_race: this.player_race,
          player_appearance: this.player_appearance,
        };

        api.updateAppearance(data).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('account.appearance.success'),
          });
          this.$store.dispatch('fetchPlayer');
        }).catch(() => {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: this.$t('account.appearance.failed'),
          });
        });
      },
    },
  };
</script>
