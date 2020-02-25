<template>
  <div class="account">
    <h1 class="title title-profile">
      {{ $t('header.profile') }}
    </h1>
    <table
      width="600"
      class="profile-table"
    >
      <tbody>
        <tr>
          <td
            width="100"
            height="100"
            align="center"
            valign="middle"
            :background="`/media/${currentPlayer.case.file}`"
          >
            <img :src="currentPlayer.getImagePath()" />
          </td>
          <td class="spacing">
            {{ $t('profile.you') }} <strong>{{ currentPlayer.name }}</strong><br>
            {{ $t('profile.level') }} <strong>{{ currentPlayer.level }}</strong><br>
            {{ $t('profile.position') }} <strong>{{ currentPlayer.x }} / {{ currentPlayer.y }}</strong><br>
            {{ $t('profile.side') }} <strong>{{ $t(currentPlayer.side.name) }}</strong><br>
          </td>
          <td class="spacing">
            {{ $t('profile.race') }} <strong>{{ $t(currentPlayer.race.name) }}</strong><br>
            {{ $t('profile.rank') }} <strong>{{ $t(currentPlayer.rank.name) }}</strong><br>
            {{ $t('profile.class') }} <strong>{{ currentPlayer.class }}</strong><br>
            <template v-if="currentPlayer.target">
              {{ $t('profile.class') }} <strong>{{ currentPlayer.target.displayName }}</strong><br>
            </template>

            {{ $t('profile.headPrice') }} <strong>{{ currentPlayer.head_price }}</strong><br>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="profile-data">
      {{ $t('profile.player.health', {"h": currentPlayer.health, "maxH": currentPlayer.total_max_health}) }}
      <b-progress
        :value="hPercent"
        variant="danger"
        max="100"
      />

      {{ $t('profile.player.ki', {"ki": currentPlayer.ki, "maxKi": currentPlayer.total_max_ki}) }}
      <b-progress
        variant="info"
        :value="kiPercent"
        max="100"
      />

      {{ $t('profile.player.ap', {"ap": currentPlayer.action_points, "maxAp": currentPlayer.max_action_points}) }}
      <b-progress
        variant="warning"
        :value="apPercent"
        max="100"
      />

      {{ $t('profile.player.mp', {"mp": currentPlayer.movement_points, "maxMp": currentPlayer.max_movement_points}) }}
      <b-progress
        variant="success"
        :value="mpPercent"
        max="100"
      />

      {{ $t('profile.player.fp', {"fp": currentPlayer.fatigue_points, "maxFp": currentPlayer.max_fatigue_points}) }}
      <b-progress
        :value="fpPercent"
        max="100"
      />

      {{ $t('profile.player.bp', {"bp": currentPlayer.battle_points - currentPlayer.battle_points_remaining_start, "maxBp": currentPlayer.battle_points_remaining_end}) }}
      <b-progress
        :value="bpPercent"
        max="100"
      />
    </div>

    <b-table
      :fields="getStatsColumns"
      :items="statsData"
      width="150"
      striped
      small
      dark
      bordered
    />

    <div class="profile-data">
      <p>
        <span v-html="$t('profile.stats.zeni', {value: currentPlayer.zeni})" /></br>
        <span v-html="$t('profile.stats.stolenZeni', {value: currentPlayer.stats.nb_stolen_zeni})" /></br>
        <span v-html="$t('profile.stats.avgStolenZeni', {value: calculateAvg(currentPlayer.stats.nb_stolen_zeni, currentPlayer.stats.nb_action_stolen_zeni)})" /></br>
        <span v-html="$t('profile.stats.nbActionStolenZeni', {value: currentPlayer.stats.nb_action_stolen_zeni})" />
      </p>

      <p>
        <span v-html="$t('profile.stats.betrayals', {value: currentPlayer.stats.betrayals})" /></br>
        <span v-html="$t('profile.stats.sidePoints', {value: currentPlayer.side_points})" /></br></br>
        <span v-html="$t('profile.stats.bountyHunter', {value: currentPlayer.stats.nb_wanted})" /></br>
        <span v-html="$t('profile.stats.nbAnalysis', {value: currentPlayer.stats.nb_analysis})" /></br>
        <span v-html="$t('profile.stats.nbDodge', {value: currentPlayer.stats.nb_dodge})" /></br>
      </p>


      <p>
        <span v-html="$t('profile.stats.healthGiven', {value: currentPlayer.stats.nb_total_health_given})" /></br>
        <span v-html="$t('profile.stats.nbHealthGiven', {value: currentPlayer.stats.nb_health_given})" /></br>
        <span v-html="$t('profile.stats.avgHealthGiven', {value: calculateAvg(currentPlayer.stats.nb_total_health_given, currentPlayer.stats.nb_health_given)})" /></br>
      </p>

      <p>
        <span v-html="$t('profile.stats.nbSpell', {value: currentPlayer.stats.nb_spell})" /></br>
        <span v-html="$t('profile.stats.nbSlapGiven', {value: currentPlayer.stats.nb_slap_given})" /></br>
        <span v-html="$t('profile.stats.nbSlapTaken', {value: currentPlayer.stats.nb_slap_taken})" /></br>
      </p>

      <p>
        <span v-html="$t('profile.stats.nbDamageHq', {value: currentPlayer.stats.nb_damage_hq})" /></br>
        <span v-html="$t('profile.stats.nbHitHq', {value: currentPlayer.stats.nb_hit_hq})" /></br>
        <span v-html="$t('profile.stats.avgDamageHq', {value: calculateAvg(currentPlayer.stats.nb_damage_hq, currentPlayer.stats.nb_hit_hq)})" /></br>
        <span v-html="$t('profile.stats.nbKillHq', {value: currentPlayer.stats.nb_kill_hq})" /></br>
      </p>

      <p>
        <span v-html="$t('profile.stats.nbDamageGood', {value: currentPlayer.stats.nb_damage_good})" /></br>
        <span v-html="$t('profile.stats.nbHitGood', {value: currentPlayer.stats.nb_hit_good})" /></br>
        <span v-html="$t('profile.stats.avgDamageGood', {value: calculateAvg(currentPlayer.stats.nb_damage_good, currentPlayer.stats.nb_hit_good)})" /></br>
        <span v-html="$t('profile.stats.nbKillGood', {value: currentPlayer.stats.nb_kill_good})" /></br>
      </p>

      <p>
        <span v-html="$t('profile.stats.nbDamageBad', {value: currentPlayer.stats.nb_damage_bad})" /></br>
        <span v-html="$t('profile.stats.nbHitBad', {value: currentPlayer.stats.nb_hit_bad})" /></br>
        <span v-html="$t('profile.stats.avgDamageBad', {value: calculateAvg(currentPlayer.stats.nb_damage_bad, currentPlayer.stats.nb_hit_bad)})" /></br>
        <span v-html="$t('profile.stats.nbKillBad', {value: currentPlayer.stats.nb_kill_bad})" /></br>
      </p>

      <p>
        <span v-html="$t('profile.stats.nbDamageNpc', {value: currentPlayer.stats.nb_damage_npc})" /></br>
        <span v-html="$t('profile.stats.nbHitNpc', {value: currentPlayer.stats.nb_hit_npc})" /></br>
        <span v-html="$t('profile.stats.avgDamageNpc', {value: calculateAvg(currentPlayer.stats.nb_damage_npc, currentPlayer.stats.nb_hit_npc)})" /></br>
        <span v-html="$t('profile.stats.nbKillNpc', {value: currentPlayer.stats.nb_kill_npc})" /></br>
      </p>


      <p>
        <span
          v-html="$t('profile.stats.nbTotalKill', {value: currentPlayer.stats.nb_kill_good + currentPlayer.stats.nb_kill_bad + currentPlayer.stats.nb_kill_npc})"
        />
            </br>
            <span v-html="$t('profile.stats.nbDeahtCount', {value: currentPlayer.stats.death_count})" />
            </br>
      </p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.$t('account.title'),
      };
    },
    computed: {
      ...mapGetters('player', ['currentPlayer']),
      hPercent() {
        return Math.floor(
          (this.currentPlayer.health * 100) / this.currentPlayer.total_max_health,
        );
      },

      kiPercent() {
        return Math.floor(
          (this.currentPlayer.ki * 100) / this.currentPlayer.total_max_ki,
        );
      },

      apPercent() {
        return Math.floor(
          (this.currentPlayer.action_points * 100) / this.currentPlayer.max_action_points,
        );
      },

      mpPercent() {
        return Math.floor(
          (this.currentPlayer.movement_points * 100) / this.currentPlayer.max_movement_points,
        );
      },

      fpPercent() {
        return Math.floor(
          (this.currentPlayer.fatigue_points * 100) / this.currentPlayer.max_fatigue_points,
        );
      },
      bpPercent() {
        return Math.floor(
          (
            (
              this.currentPlayer.battle_points
                - this.currentPlayer.battle_points_remaining_start
            ) * 100
          ) / this.currentPlayer.battle_points_remaining_end,
        );
      },
      statsData() {
        if (!this.currentPlayer) {
          return [];
        }

        return [
          {
            type: this.$t('profile.stats.normal'),
            health: this.currentPlayer.max_health,
            ki: this.currentPlayer.max_ki,
            strength: this.currentPlayer.strength,
            accuracy: this.currentPlayer.accuracy,
            agility: this.currentPlayer.agility,
            intellect: this.currentPlayer.intellect,
            resistance: this.currentPlayer.resistance,
            vision: this.currentPlayer.vision,
            skill: this.currentPlayer.skill,
            analysis: this.currentPlayer.analysis,
          },
          {
            type: this.$t('profile.stats.objects'),
            health: this.currentPlayer.objects.max_health,
            ki: this.currentPlayer.objects.max_ki,
            strength: this.currentPlayer.objects.strength,
            accuracy: this.currentPlayer.objects.accuracy,
            agility: this.currentPlayer.objects.agility,
            intellect: this.currentPlayer.objects.intellect,
            resistance: this.currentPlayer.objects.resistance,
            vision: this.currentPlayer.objects.vision,
            skill: this.currentPlayer.objects.skill,
            analysis: this.currentPlayer.objects.analysis,
          },
          {
            type: this.$t('profile.stats.total'),
            health: this.currentPlayer.total_max_health,
            ki: this.currentPlayer.total_max_ki,
            strength: this.currentPlayer.total_strength,
            accuracy: this.currentPlayer.total_accuracy,
            agility: this.currentPlayer.total_agility,
            intellect: this.currentPlayer.total_intellect,
            resistance: this.currentPlayer.total_resistance,
            vision: this.currentPlayer.total_vision,
            skill: this.currentPlayer.total_skill,
            analysis: this.currentPlayer.total_analysis,
          },
        ];
      },
    },
    data() {
      return {
        getStatsColumns: [
          {
            key: 'type',
            width: 100,
            fixed: 'left',
          },
          {
            title: this.$t('health'),
            key: 'health',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('ki'),
            key: 'ki',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('strength'),
            key: 'strength',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('accuracy'),
            key: 'accuracy',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('agility'),
            key: 'agility',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('intellect'),
            key: 'intellect',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('resistance'),
            key: 'resistance',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('vision'),
            key: 'vision',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('skill'),
            key: 'skill',
            align: 'center',
            width: 100,
          },
          {
            title: this.$t('analysis'),
            key: 'analysis',
            align: 'center',
            width: 100,
          },
        ],
      };
    },
    methods: {
      rowClassName(row, index) {
        if (index === 1) {
          return 'table-objects-row';
        } if (index === 2) {
          return 'table-total-row';
        }

        return '';
      },
      calculateAvg(total, nb) {
        return Number(total / (nb === 0 ? 1 : nb)).toFixed(2);
      },
    },
  };
</script>
