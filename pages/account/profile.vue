<template>
    <div class="account">
        <h1 class="title title-profile">{{ $t('header.profile') }}</h1>
        <table width="600">
            <tbody>
                <tr>
                    <td width="150" height="150" align="center" valign="middle">
                        <img :src="currentPlayer.getImagePath()"/>
                    </td>
                    <td>
                        {{ $t('profile.you') }} <strong>{{ currentPlayer.name }}</strong><br/>
                        {{ $t('profile.level') }} <strong>{{ currentPlayer.level }}</strong><br/>
                        {{ $t('profile.position') }} <strong>{{ currentPlayer.x }} / {{ currentPlayer.y }}</strong><br/>
                        {{ $t('profile.side') }} <strong>{{ $t(currentPlayer.side.name) }}</strong><br/>
                    </td>
                    <td>
                        {{ $t('profile.race') }} <strong>{{ $t(currentPlayer.race.name) }}</strong><br/>
                        {{ $t('profile.rank') }} <strong>{{ $t(currentPlayer.rank.name) }}</strong><br/>
                        {{ $t('profile.class') }} <strong>{{ $t(currentPlayer.class) }}</strong><br/>
                        <template v-if="currentPlayer.target">
                            {{ $t('profile.class') }} <strong>{{ currentPlayer.target.displayName }}</strong><br/>
                        </template>

                        {{ $t('profile.headPrice') }} <strong>{{ currentPlayer.head_price }}</strong><br/>
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            {{ $t('profile.player.health', {"h": currentPlayer.health, "maxH": currentPlayer.total_max_health}) }}
            <div class="progress">
                <div class="progress-bar progress-bar-danger"
                     role="progressbar"
                     :aria-valuenow="hPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${hPercent}%`">
                </div>
            </div>

            {{ $t('profile.player.ki', {"ki": currentPlayer.ki, "maxKi": currentPlayer.total_max_ki}) }}
            <div class="progress">
                <div class="progress-bar progress-bar-info"
                     role="progressbar"
                     :aria-valuenow="kiPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${kiPercent}%`">
                </div>
            </div>

            {{ $t('profile.player.ap', {"ap": currentPlayer.action_points, "maxAp": currentPlayer.max_action_points}) }}
            <div class="progress">
                <div class="progress-bar progress-bar-warning"
                     role="progressbar"
                     :aria-valuenow="apPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${apPercent}%`">
                </div>
            </div>

            {{ $t('profile.player.mp', {"mp": currentPlayer.movement_points, "maxMp": currentPlayer.max_movement_points}) }}
            <div class="progress">
                <div class="progress-bar progress-bar-success"
                     role="progressbar"
                     :aria-valuenow="mpPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${mpPercent}%`">
                </div>
            </div>

            {{ $t('profile.player.fp', {"fp": currentPlayer.fatigue_points, "maxFp": currentPlayer.max_fatigue_points}) }}
            <div class="progress">
                <div class="progress-bar"
                     role="progressbar"
                     :aria-valuenow="fpPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${fpPercent}%`">
                </div>
            </div>

            {{ $t('profile.player.bp', {"bp": currentPlayer.battle_points - currentPlayer.battle_points_remaining_start, "maxBp": currentPlayer.battle_points_remaining_end}) }}
            <div class="progress">
                <div class="progress-bar"
                     role="progressbar"
                     :aria-valuenow="bpPercent"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     :style="`width: ${bpPercent}%`">
                </div>
            </div>
        </div>

        <Table :row-class-name="rowClassName" :columns="statsColumns" :data="statsData" stripe size="small"></Table>

        <div>
            <p>
                <span v-html="$t('profile.stats.zeni', {zeni: currentPlayer.zeni})"></span></br>
                Tu as volé {{ currentPlayer.stats.nb_stolen_zeni }}<br/>
                Moyenne de Zénies obtenus par vols : {{ currentPlayer.stats.nb_stolen_zeni / (currentPlayer.stats.nb_action_stolen_zeni == 0 ? 1 : currentPlayer.stats.nb_action_stolen_zeni) }}<br/>
                Nombre de vols accomplis : {{ currentPlayer.stats.nb_action_stolen_zeni }}<br/>
            </p>

            <p>
                Tu as trahi {{ currentPlayer.stats.betrayals }} fois tes compagnons.<br/>
                Tu as {{ currentPlayer.side_points }} point(s) de côté. <br/>
                <br/>
                Chasseur de primes : {{ currentPlayer.stats.nb_wanted}} cible(s) &agrave; ton actif.
                Nombre d'évaluations : {{ currentPlayer.stats.nb_wnalysis }}<br/><br/>
                Nombre de coups esquivés : {{ currentPlayer.stats.nb_dodge }}
                <br/>
            </p>


            <p>
                Points de vie soignés : {{ currentPlayer.stats.nb_total_health_given }}<br/>
                Nombre de soins effectués : {{ currentPlayer.stats.nb_health_given }}<br/>
                Moyenne de point de vies administrés : {{ currentPlayer.stats.nb_total_health_given / (currentPlayer.stats.nb_health_given == 0 ? 1 : currentPlayer.stats.nb_health_given) }}<br/>
            </p>

            <p>
                Nombre de sorts lancés: {{ currentPlayer.stats.nb_spell }} <br/>
                Nombre de torgnoles données: {{ currentPlayer.stats.nb_slap_given }} <br/>
                Nombre de torgnoles reçues: {{ currentPlayer.stats.nb_slap_taken }} <br/>
            </p>

            <p>
                Tu as donné {{ currentPlayer.stats.nb_damage_hq }} dégât(s) aux Qg(s).<br/>
                Tu as donné {{ currentPlayer.stats.nb_hit_hq }} coup(s) aux Qg(s).<br/>
                Ta moyenne de dégât(s) par coup aux Qg(s) est de : {{ currentPlayer.stats.nb_damage_hq / (currentPlayer.stats.nb_hit_hq == 0 ? 1 : currentPlayer.stats.nb_hit_hq) }}<br/>
                Tu as détruit {{ currentPlayer.stats.nb_kill_hq }} Qg(s).
            </p>

            <p>
                Tu as donné {{ currentPlayer.stats.nb_damage_good }} dégât(s) aux Gentils.<br/>
                Tu as donné {{ currentPlayer.stats.nb_hit_good }} coup(s) aux Gentils.<br/>
                Ta moyenne de dégât(s) par coup aux Gentils est de : {{ currentPlayer.stats.nb_damage_good / (currentPlayer.stats.nb_hit_good == 0 ? 1 : currentPlayer.stats.nb_hit_good) }}<br/>
                <br/>
                Tu as tué {{ currentPlayer.stats.nb_kill_good }} Gentil(s).
            </p>

            <p>
                Tu as donné {{ currentPlayer.stats.nb_damage_bad }} dégât(s) aux Méchants.<br/>
                Tu as donné {{ currentPlayer.stats.nb_hit_bad }} coup(s) aux Méchants.<br/>
                Ta moyenne de dégât(s) par coup aux Méchants est de : {{ currentPlayer.stats.nb_damage_bad / (currentPlayer.stats.nb_hit_bad == 0 ? 1 : currentPlayer.stats.nb_hit_bad) }}<br/>
                <br/>
                Tu as tué {{ currentPlayer.stats.nb_kill_bad }} Méchant(s).
            </p>

            <p>
                Tu as donné {{ currentPlayer.stats.nb_damage_npc }} dégât(s) aux Pnjs.<br/>
                Tu as donné {{ currentPlayer.stats.nb_hit_npc }} coup(s) aux Pnjs.<br/>
                Ta moyenne de dégât(s) par coup aux Pnjs est de : {{ currentPlayer.stats.nb_damage_npc / (currentPlayer.stats.nb_hit_npc == 0 ? 1 : currentPlayer.stats.nb_hit_npc) }}<br/>
                <br/>
                Tu as tué {{ currentPlayer.stats.nb_kill_npc }} Pnj(s).
            </p>


            <p>
                Tu as tué {{ currentPlayer.stats.nb_kill_good + currentPlayer.stats.nb_kill_bad + currentPlayer.stats.nb_kill_npc }} personne(s) en tout, y compris les PNJ.<br/>
                Tu es mort {{ currentPlayer.stats.death_count }} fois.
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';

    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('account.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
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
                        (this.currentPlayer.battle_points - this.currentPlayer.battle_points_remaining_start) * 100
                    ) / this.currentPlayer.battle_points_remaining_end,
                );
            },
            statsData() {
                if (!this.currentPlayer) {
                    return [];
                }

                return [
                    {
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
                statsColumns: [
                    {
                        title: this.$t('health'),
                        key: 'health',
                        align: 'center',
                    },
                    {
                        title: this.$t('ki'),
                        key: 'ki',
                        align: 'center',
                    },
                    {
                        title: this.$t('strength'),
                        key: 'strength',
                        align: 'center',
                    },
                    {
                        title: this.$t('accuracy'),
                        key: 'accuracy',
                        align: 'center',
                    },
                    {
                        title: this.$t('agility'),
                        key: 'agility',
                        align: 'center',
                    },
                    {
                        title: this.$t('intellect'),
                        key: 'intellect',
                        align: 'center',
                    },
                    {
                        title: this.$t('resistance'),
                        key: 'resistance',
                        align: 'center',
                    },
                    {
                        title: this.$t('vision'),
                        key: 'vision',
                        align: 'center',
                    },
                    {
                        title: this.$t('skill'),
                        key: 'skill',
                        align: 'center',
                    },
                    {
                        title: this.$t('analysis'),
                        key: 'analysis',
                        align: 'center',
                    },
                ],
            };
        },
        methods: {
            rowClassName(row, index) {
                if (index === 1) {
                    return 'table-objects-row';
                } else if (index === 2) {
                    return 'table-total-row';
                }

                return '';
            },
        },
    };
</script>
