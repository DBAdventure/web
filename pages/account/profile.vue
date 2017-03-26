<template>
    <div class="account">
        <h1 class="title title-profile">{{ 'header.profile' | trans }}</h1>

        {% set user = app.user %}
        <table width="600">
            <tr>
                <td width="150" height="150" align="center" valign="middle">
                    <img src="{{ asset(user.imagePath) }}"/>
                </td>
                <td>
                    {{ 'profile.you' | trans }} <strong>{{ user.name }}</strong><br/>
                    {{ 'profile.level' | trans }} <strong>{{ user.level }}</strong><br/>
                    {{ 'profile.position' | trans }} <strong>{{ user.x }} / {{ user.y }}</strong><br/>
                    {{ 'profile.side' | trans }} <strong>{{ user.side.name | trans }}</strong><br/>
                </td>
                <td>
                    {{ 'profile.race' | trans }} <strong>{{ user.race.name | trans }}</strong><br/>
                    {{ 'profile.rank' | trans }} <strong>{{ user.rank.name | trans }}</strong><br/>
                    {{ 'profile.class' | trans }} <strong>{{ user.class | trans }}</strong><br/>
                    {% if user.target is not null %}
                    {{ 'profile.class' | trans }} <strong>{{ user.target.displayName }}</strong><br/>
                    {% endif %}

                    {{ 'profile.head.price' | trans }} <strong>{{ user.headPrice }}</strong><br/>
                </td>
            </tr>
        </table>

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td>
                    <table align="left" width="100%">
                        <tbody>
                            <tr valign="middle">
                                <td width="150">
                                    {{ 'profile.player.health' | trans({"%h%": user.health, "%max_h%": user.totalMaxHealth}) }}
                                </td>
                                <td colspan="3">
                                    {% set hPercent = ((user.health * 100) / user.totalMaxHealth) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="{{ hPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ hPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr valign="middle">
                                <td width="150">
                                    {{ 'profile.player.ki' | trans({"%ki%": user.ki, "%max_ki%": user.totalMaxKi}) }}
                                </td>
                                <td colspan="3">
                                    {% set kiPercent = ((user.ki * 100) / user.totalMaxKi) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="{{ kiPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ kiPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr valign="middle">
                                <td width="150">
                                    {% set bpRemainingStart = user.battlePointsRemaining(user.level - 1) %}
                                    {% set bpRemainingEnd = user.battlePointsRemaining() - bpRemainingStart %}
                                    {{ 'profile.player.bp' | trans({"%bp%": user.battlePoints - bpRemainingStart, "%max_bp%": bpRemainingEnd}) }}
                                </td>
                                <td colspan="3">
                                    {% set bpPercent = (((user.battlePoints - bpRemainingStart) * 100) / bpRemainingEnd) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="{{ bpPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ bpPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr valign="middle">
                                <td width="150">
                                    {{ 'profile.player.fp' | trans({"%fp%": user.fatiguePoints, "%max_fp%": user.maxFatiguePoints}) }}
                                </td>
                                <td colspan="3">
                                    {% set fpPercent = ((user.fatiguePoints * 100) / user.maxFatiguePoints) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="{{ fpPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ fpPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr valign="middle">
                                <td width="150">
                                    {{ 'profile.player.ap' | trans({"%ap%": user.actionPoints, "%max_ap%": user.maxActionPoints}) }}
                                </td>
                                <td colspan="3">
                                    {% set apPercent = ((user.actionPoints * 100) / user.maxActionPoints) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="{{ apPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ apPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr valign="middle">
                                <td width="150">
                                    {{ 'profile.player.mp' | trans({"%mp%": user.movementPoints, "%max_mp%": user.maxMovementPoints}) }}
                                </td>
                                <td colspan="3">
                                    {% set mpPercent = ((user.movementPoints * 100) / user.maxMovementPoints) | round(0, 'floor') %}
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="{{ mpPercent }}" aria-valuemin="0" aria-valuemax="100" style="width: {{ mpPercent }}%">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>

        <span class="humain-saiyajin">Couleur</span> Pour les compétences du joueur<br/>
        <span class="bad">Couleur</span> Pour les compétences des objets<br/>
        <span class="typepurple">Couleur</span> Pour les compétences totales<br/>

        <table class="table table-condensed table-striped">
            <tbody>
                <tr valign="middle">
                    <td>
                        {{ 'health' | trans }}
                    </td>
                    <td>
                        {{ 'ki' | trans }}
                    </td>
                    <td>
                        {{ 'strength' | trans }}
                    </td>
                    <td>
                        {{ 'accuracy' | trans }}
                    </td>
                    <td>
                        {{ 'agility' | trans }}
                    </td>
                    <td>
                        {{ 'intellect' | trans }}
                    </td>
                    <td>
                        {{ 'resistance' | trans }}
                    </td>
                    <td>
                        {{ 'vision' | trans }}
                    </td>
                    <td>
                        {{ 'skill' | trans }}
                    </td>
                    <td>
                        {{ 'analysis' | trans }}
                    </td>
                </tr>
                <tr valign="middle">
                    <td>
                        {{ user.maxHealth }}
                    </td>
                    <td>
                        {{ user.maxKi }}
                    </td>
                    <td>
                        {{ user.strength }}
                    </td>
                    <td>
                        {{ user.accuracy }}
                    </td>
                    <td>
                        {{ user.agility }}
                    </td>
                    <td>
                        {{ user.intellect }}
                    </td>
                    <td>
                        {{ user.resistance }}
                    </td>
                    <td>
                        {{ user.vision }}
                    </td>
                    <td>
                        {{ user.skill }}
                    </td>
                    <td>
                        {{ user.analysis }}
                    </td>
                </tr>
                <tr valign="middle">
                    <td>
                        {{ user.objectsMaxHealth }}
                    </td>
                    <td>
                        {{ user.objectsMaxKi }}
                    </td>
                    <td>
                        {{ user.objectsStrength }}
                    </td>
                    <td>
                        {{ user.objectsAccuracy }}
                    </td>
                    <td>
                        {{ user.objectsAgility }}
                    </td>
                    <td>
                        {{ user.objectsIntellect }}
                    </td>
                    <td>
                        {{ user.objectsResistance }}
                    </td>
                    <td>
                        {{ user.objectsVision }}
                    </td>
                    <td>
                        {{ user.objectsSkill }}
                    </td>
                    <td>
                        {{ user.objectsAnalysis }}
                    </td>
                </tr>
                <tr valign="middle">
                    <td>
                        {{ user.totalMaxHealth }}
                    </td>
                    <td>
                        {{ user.totalMaxKi }}
                    </td>
                    <td>
                        {{ user.totalStrength }}
                    </td>
                    <td>
                        {{ user.totalAccuracy }}
                    </td>
                    <td>
                        {{ user.totalAgility }}
                    </td>
                    <td>
                        {{ user.totalIntellect }}
                    </td>
                    <td>
                        {{ user.totalResistance }}
                    </td>
                    <td>
                        {{ user.totalVision }}
                    </td>
                    <td>
                        {{ user.totalSkill }}
                    </td>
                    <td>
                        {{ user.totalAnalysis }}
                    </td>
                </tr>
            </tbody>
        </table>

        <p>
            Tu as {{ user.zeni }}<br/>
            Tu as volé {{ user.nbStolenZeni }}<br/>
            Moyenne de Zénies obtenus par vols : {{ user.nbStolenZeni / (user.nbActionStolenZeni == 0 ? 1 : user.nbActionStolenZeni) }}<br/>
            Nombre de vols accomplis : {{ user.nbActionStolenZeni }}<br/>
        </p>

        <p>
            Tu as trahi {{ user.betrayals }} fois tes compagnons.<br/>
            Tu as {{ user.sidePoints }} point(s) de côté. <br/>
            <br/>
            Chasseur de primes : {{ user.nbWanted}} cible(s) &agrave; ton actif.
            Nombre d'évaluations : {{ user.nbAnalysis }}<br/><br/>
            Nombre de coups esquivés : {{ user.nbDodge }}
            <br/>
        </p>


        <p>
            Points de vie soignés : {{ user.nbTotalHealthGiven }}<br/>
            Nombre de soins effectués : {{ user.nbHealthGiven }}<br/>
            Moyenne de point de vies administrés : {{ user.nbTotalHealthGiven / (user.nbHealthGiven == 0 ? 1 : user.nbHealthGiven) }}<br/>
        </p>


        <p>
            Nombre de sorts lancés: {{ user.nbSpell }} <br/>
            Nombre de torgnoles données: {{ user.nbSlapGiven }} <br/>
            Nombre de torgnoles reçues: {{ user.nbSlapTaken }} <br/>
        </p>

        <p>
            Tu as donné {{ user.nbDamageHq }} dégât(s) aux Qg(s).<br/>
            Tu as donné {{ user.nbHitHq }} coup(s) aux Qg(s).<br/>
            Ta moyenne de dégât(s) par coup aux Qg(s) est de : {{ user.nbDamageHq / (user.nbHitHq == 0 ? 1 : user.nbHitHq) }}<br/>
            Tu as détruit {{ user.nbKillHq }} Qg(s).
        </p>

        <p>
            Tu as donné {{ user.nbDamageGood }} dégât(s) aux Gentils.<br/>
            Tu as donné {{ user.nbHitGood }} coup(s) aux Gentils.<br/>
            Ta moyenne de dégât(s) par coup aux Gentils est de : {{ user.nbDamageGood / (user.nbHitGood == 0 ? 1 : user.nbHitGood) }}<br/>
            <br/>
            Tu as tué {{ user.nbKillGood }} Gentil(s).
        </p>

        <p>
            Tu as donné {{ user.nbDamageBad }} dégât(s) aux Méchants.<br/>
            Tu as donné {{ user.nbHitBad }} coup(s) aux Méchants.<br/>
            Ta moyenne de dégât(s) par coup aux Méchants est de : {{ user.nbDamageBad / (user.nbHitBad == 0 ? 1 : user.nbHitBad) }}<br/>
            <br/>
            Tu as tué {{ user.nbKillBad }} Méchant(s).
        </p>

        <p>
            Tu as donné {{ user.nbDamageNpc }} dégât(s) aux Pnjs.<br/>
            Tu as donné {{ user.nbHitNpc }} coup(s) aux Pnjs.<br/>
            Ta moyenne de dégât(s) par coup aux Pnjs est de : {{ user.nbDamageNpc / (user.nbHitNpc == 0 ? 1 : user.nbHitNpc) }}<br/>
            <br/>
            Tu as tué {{ user.nbKillNpc }} Pnj(s).
        </p>


        <p>
            Tu as tué {{ user.nbKillGood + user.nbKillBad + user.nbKillNpc }} personne(s) en tout, y compris les PNJ.<br/>
            Tu es mort {{ user.deathCount }} fois.
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
 export default {
     middleware: 'auth',
     head: {
         title: 'Account profile',
     },
     data() {
         return {
         };
     },
 };
</script>
