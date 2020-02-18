<template>
  <div class="account">
    <h1 class="title title-magic">
      {{ $t('magic.title') }}
    </h1>
    <div>
      <p v-html="$t('magic.presentation.intro', {name: currentPlayer.name})" />
      <p v-html="$t('magic.presentation.text')" />

      <b-table
        :fields="getSpellColumns()"
        :items="spells"
        hovered
        dark
        striped
      >
        <template v-slot:cell(description)="data">
          <p>{{ $t(`spells.${data.item.name}.descriptionRp`) }}</p>
          <requirements :data="data.item.requirements" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';
  import Requirements from '~/components/utils/requirements';

  export default {
    middleware: 'auth',
    components: {
      Requirements,
    },
    head() {
      return {
        title: this.$t('account.magic.title'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    data() {
      return {
        spells: [],
      };
    },
    asyncData({store}) {
      if (!store.state.player.connected) {
        return {};
      }

      return api.getSpells().then((res) => ({
        spells: res.data,
      })).catch(() => {});
    },
    methods: {
      getSpellColumns() {
        return [
          {
            title: this.$t('object.name'),
            key: 'name',
          },
          {
            title: this.$t('object.description'),
            key: 'description',
          },
        ];
      },
    },
  };
</script>
