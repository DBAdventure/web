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
        <Poptip
          confirm
          :title="$t('modal.confirm.guild.cancel')"
          @on-ok="leaveGuild()"
        >
          <a
            href="#"
            @click.prevent=""
          >{{ $t('guild.cancel') }}</a>
        </Poptip>
      </template>
      <template v-else-if="!currentPlayer.guild_player.enabled">
        <p>{{ $t('guild.player.not.enabled') }}</p>
        <Poptip
          confirm
          :title="$t('modal.confirm.guild.request.leave')"
          @on-ok="leaveGuild()"
        >
          <a
            href="#"
            @click.prevent=""
          >{{ $t('guild.request.cancel') }}</a>
        </Poptip>
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

<script type="text/ecmascript-6">
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
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    methods: {
      async leaveGuild() {
        this.$Loading.start();
        await api.leaveGuild().then((res) => {
          const messages = res.data.messages.map((e) => this.$t(e));
          this.$Notice.success({
            title: this.$t('notice.success'),
            desc: messages.join('\n'),
          });
          this.$Loading.finish();
        }).catch(() => {
          this.raiseError();
        });

        this.$store.dispatch('fetchPlayer');
      },
    },
  };
</script>
