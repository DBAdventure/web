<script>
  import Player from '~/lib/player';
  import {isEmpty} from '~/lib/utils';

  export default {
    data() {
      return {
        players: {},
      };
    },
    methods: {
      getPlayer(entity) {
        if (isEmpty(this.players[entity.id])) {
          this.players[entity.id] = new Player(entity);
        }

        return this.players[entity.id];
      },
    },
  };
</script>
