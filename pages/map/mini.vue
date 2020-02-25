<template>
  <div>
    <h1 class="title title-map">
      {{ $t('map.title') }}
    </h1>

    <div class="minimap text-center">
      <img
        class="map-image"
        src="/api/map/mini.png"
        usemap="#minimap"
      >
      <map
        name="minimap"
        id="minimap"
      >
        <area
          v-for="item in buildings"
          :key="item.id"
          href="#"
          shape="circle"
          data-toggle="tooltip"
          data-placement="top"
          :coords="`${(item.x * 5) - (dot / 2)},${(item.y * 5) - (dot / 2)},5`"
          :title="`(${item.x}, ${item.y}) ${$t(name)}`"
        >

        <area
          v-for="item in players"
          :key="item.id"
          href="#"
          shape="circle"
          data-toggle="tooltip"
          data-placement="top"
          :coords="`${(item.x * 5) - (dot / 2)},${(item.y * 5) - (dot / 2)},5`"
          :title="`(${item.x}, ${item.y}) ${item.name}`"
        >

        <area
          href="#"
          shape="circle"
          data-toggle="tooltip"
          data-placement="top"
          :coords="`${(currentPlayer.x * 5) - (dot / 2)},${(currentPlayer.y * 5) - (dot / 2)},5`"
          :title="`(${currentPlayer.x}, ${currentPlayer.y}) ${currentPlayer.name}`"
        >
      </map>

      <table class="table table-condensed table-bordered">
        <thead>
          <tr>
            <th
              colspan="4"
              class="text-center"
            >
              {{ $t('map.legend.title') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="/images/map/mini-legend/player.png"></td>
            <td>{{ $t('map.legend.me') }}</td>
            <td><img src="/images/map/mini-legend/guilds.png"></td>
            <td>{{ $t('map.legend.guild') }}</td>
          </tr>
          <tr>
            <td><img src="/images/map/mini-legend/buildings.png"></td>
            <td>{{ $t('map.legend.buildings') }}</td>
            <td><img src="/images/map/mini-legend/npcs.png"></td>
            <td>{{ $t('map.legend.npcs') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
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
        players: {},
        buildings: {},
      };
    },
    computed: {
      ...mapGetters('player', ['currentPlayer']),
    },
    asyncData({error}) {
      return api.getMiniMap().then((res) => (
        {
          players: res.data.players,
          buildings: res.data.buildings,
          dot: res.data.dot,
        }
      )).catch(() => {
        error({
          message: 'error.forbidden',
          statusCode: 403,
        });
      });
    },
  };
</script>
