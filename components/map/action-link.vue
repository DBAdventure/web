<template>
  <a
    href="#"
    @click.prevent="runAction"
  >
    <img
      :src="imagePath"
      :alt="$t(`map.action.${what}`, {'AP': action})"
      :title="$t(`map.action.${what}`, {'AP': action})"
    >
    <template v-if="messageKey">
      {{ $t(messageKey, {'AP': action}) }}
    </template>
  </a>
</template>

<script type="text/ecmascript-6">
  import settings from '~/config/general.config';

  export default {
    props: {
      player: {
        type: Object,
        required: true,
      },
      me: {
        type: Object,
        required: true,
      },
      what: {
        type: String,
        required: true,
      },
      messageKey: {
        type: String,
        required: false,
        default: '',
      },
    },
    data() {
      return {
        settings,
      };
    },
    computed: {
      action() {
        return settings.player[`${this.what.toUpperCase()}_ACTION`];
      },
      imagePath() {
        if (this.player.isPlayer()) {
          return this.player.getActionImagePath(this.what);
        }

        return this.me.getActionImagePath(this.what);
      },
    },
    methods: {
      runAction() {
        this.$parent.$emit(
          'run-action',
          {
            action: this.what,
            id: this.player.id,
          },
        );
      },
    },
  };
</script>
