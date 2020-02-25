<template>
  <div id="guild">
    <template v-if="!currentPlayer.guild_player">
      <h1 class="title title-default">
        {{ $t('guilds') }}
      </h1>

      <p class="text-center">
        {{ $t('guild.not.guilded') }}
      </p>

      <ul>
        <li>
          <router-link to="/guild/create">
            {{ $t('guild.create') }}
          </router-link>
        </li>
        <li>
          <router-link to="/guild/list">
            {{ $t('guild.view') }}
          </router-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <h1 class="title title-default">
        {{ currentPlayer.getGuild().name }}
      </h1>
      <template v-if="!currentPlayer.getGuild().enabled">
        <p>{{ $t('guild.not.enabled') }}</p>
        <b-modal
          :title="$t('modal.confirm.guild.cancel')"
          @ok="leaveGuild()"
          id="guild-cancel"
        />
        <a
          href="#"
          @click.prevent=""
          v-b-modal.guild-cancel
        >
          {{ $t('guild.cancel') }}
        </a>
      </template>
      <template v-else-if="!currentPlayer.guild_player.enabled">
        <p>{{ $t('guild.player.not.enabled') }}</p>
        <b-modal
          :title="$t('modal.confirm.guild.request.leave')"
          id="guild-leave"
          @ok="leaveGuild()"
        />
        <a
          href="#"
          @click.prevent=""
          v-b-modal.guild-leave
        >{{ $t('guild.request.cancel') }}</a>
      </template>
      <template v-else>
        <guild-menu />

        <template v-if="currentPlayer.getGuild().message">
          <h1 class="title title-guild-message">
            {{ $t('guild.message') }}
          </h1>
          <p>
            <template v-for="(line, index) in currentPlayer.getGuild().message.split('\n')">
              {{ line }}
              <br :key="index">
            </template>
          </p>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import api from '~/services/api';
  import GuildMenu from '~/components/guild/menu';
  import ErrorMixin from '~/components/mixins/error';

  export default {
    middleware: 'auth',
    mixins: [ErrorMixin],
    components: {
      GuildMenu,
    },
    head() {
      if (this.currentPlayer.guild_player && this.currentPlayer.getGuild()) {
        return {
          title: this.currentPlayer.getGuild().name,
        };
      }

      return {
        title: this.$t('guild'),
      };
    },
    computed: {
      ...mapGetters('player', ['currentPlayer']),
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
        }).catch(() => {
          this.raiseError();
        });

        this.$store.dispatch('player/fetch');
      },
    },
  };
</script>
