<template>
  <div class="account">
    <h1 class="title title-training-room">
      {{ $t('training.room') }}
    </h1>

    <div class="text-center">
      <img :src="currentPlayer.getImagePath()">
      <p v-html="$t('training.text')" />
    </div>
    <div class="text-left">
      <p>{{ $t('training.you.have') }}</p>
      <ul>
        <li>{{ $t('training.you.skill', {skillPoints: currentPlayer.skill_points}) }}</li>
        <li>{{ $t('training.you.action', {actionPoints: currentPlayer.action_points}) }}</li>
      </ul>

      {{ $t('training.info') }}
    </div>

    <b-table
      :fields="columns"
      :items="skills"
      dark
      striped
      hovered
    >
      <template v-slot:cell(name)="data">
        <p>
          <strong>
            {{ $t(`training.${data.value}.title`, {value: currentPlayer[data.item.comp]}) }}
          </strong>
        </p>
        <p>
          {{ $t(`training.${data.value}.description`) }}
        </p>
      </template>

      <template v-slot:cell(action)="data">
        <p>{{ $t('training.increase.require') }}</p>
        <template v-if="currentPlayer.skill_points > 0 && currentPlayer.action_points >= 5">
          <b-button
            variant="parimary"
            size="sm"
            @click="train(data.item.name)"
          >
            {{ $t(`training.${data.item.name}.increase`) }}
          </b-button>
        </template>
      </template>
    </b-table>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.$t('training.title'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    data() {
      return {
        columns: [
          {
            label: this.$t('training.capacity'),
            key: 'name',
          },
          {
            title: this.$t('training.action'),
            key: 'action',
          },
        ],
        skills: [
          {name: 'health', comp: 'max_health'},
          {name: 'ki', comp: 'max_ki'},
          {name: 'skill', comp: 'skill'},
          {name: 'analysis', comp: 'analysis'},
          {name: 'strength', comp: 'strength'},
          {name: 'resistance', comp: 'resistance'},
          {name: 'accuracy', comp: 'accuracy'},
          {name: 'agility', comp: 'agility'},
          {name: 'intellect', comp: 'intellect'},
          {name: 'vision', comp: 'vision'},
        ],
      };
    },
    methods: {
      train(what) {
        api.useTrainingPoint(what).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('training.success'),
          });
          this.$store.dispatch('fetchPlayer');
        }).catch(() => {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: this.$t('training.error'),
          });
        });
      },
    },
  };
</script>
