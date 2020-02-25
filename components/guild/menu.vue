<template>
  <div class="top">
    <ul class="list-dots">
      <li v-if="currentPlayer.getGuildRank() === settings.guild.ROLE_MODO || currentPlayer.getGuildRank() === settings.guild.ROLE_ADMIN">
        <router-link to="/guild/admin">
          {{ $t('guild.admin.title') }}
        </router-link>
      </li>

      <li>
        <router-link to="/guild/members">
          {{ $t('guild.members') }}
        </router-link>
      </li>
      <li>
        <router-link to="/guild/requester">
          {{ $t('guild.requester') }}
        </router-link>
      </li>
      <li>
        <router-link to="/guild/events">
          {{ $t('guild.events') }}
        </router-link>
      </li>
      <li>
        <router-link to="/ranking?type=guild">
          {{ $t('guild.ranking.intra') }}
        </router-link>
      </li>
    </ul>

    <div class="bottom">
      <b-modal
        :title="$t('modal.confirm.guild.leave')"
        @ok="leaveGuild()"
        id="guild-leave"
      />
      <a
        href="#"
        @click.prevent=""
        v-b-modal.guild-leave
      >
        {{ $t('guild.leave') }}
      </a>
      -
      <router-link to="/guild/list">
        {{ $t('guild.viewOthers') }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import settings from '~/config/general.config';
  import api from '~/services/api';
  import ErrorMixin from '~/components/mixins/error';

  export default {
    computed: {
      ...mapGetters('player', ['currentPlayer']),
    },
    mixins: [
      ErrorMixin,
    ],
    data() {
      return {
        settings,
      };
    },
    methods: {
      async leaveGuild() {
        this.$nuxt.$loading.start();
        await api.leaveGuild().then((res) => {
          const messages = res.data.messages.map((e) => this.$t(e));
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: messages.join('\n'),
          });
          this.$nuxt.$loading.finish();
          this.$router.push('/guild', {force: true});
        }).catch(() => {
          this.raiseError();
        });

        this.$store.dispatch('player/fetch');
      },
    },
  };
</script>
