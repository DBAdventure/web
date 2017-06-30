<template>
    <div>
        <h1 class="title title-register">{{ $t('register.text') }}</h1>
        <p>{{ $t('register.welcome') }}</p>
        <p>{{ $t('register.intro') }}</p>

        <form id="register-form" class="form-horizontal" method="post" @submit.prevent="register">
            <h2>{{ $t('register.personalinfo') }}</h2>

            <bs-input name="name"
                      :placeholder="$t('form.name')"
                      :label="$t('form.name')"
                      v-model="player.name"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="text" />
            <bs-input name="login"
                      :placeholder="$t('form.login')"
                      :label="$t('form.login')"
                      v-model="player.login"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="text" />
            <bs-input name="password"
                      :placeholder="$t('form.password')"
                      :label="$t('form.password')"
                      v-model="player.password"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="password" />
            <bs-input name="password_confirm"
                      :placeholder="$t('form.passwordConfirm')"
                      :label="$t('form.passwordConfirm')"
                      :match="player.password"
                      v-model="player.password_confirm"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="password" />
            <bs-input name="email"
                      :placeholder="$t('form.email')"
                      :label="$t('form.email')"
                      v-model="player.email"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="email" />
            <bs-input name="email"
                      :placeholder="$t('form.emailConfirm')"
                      :label="$t('form.emailConfirm')"
                      :match="player.email"
                      v-model="player.email_confirm"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="email" />

            <h2>{{ $t('register.speciality') }}</h2>
            <p>{{ $t('register.specialityIntro') }}</p>

            <div class="form-group">
                <label class="col-sm-2 control-label required">{{ $t('class') }}</label>
                <div class="col-sm-10">
                    <bs-group justified>
                        <bs-select
                            v-model="player.clas"
                            :options="classes"
                            required>
                        </bs-select>
                    </bs-group>
                </div>
            </div>

            <transition name="fade" mode="out-in">
                <div class="class-list" v-if="player.clas === 1" key="1">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('warrior') }}</h3>
                        <img src="/images/avatars/players/M7.png" :title="$t('warrior')" :alt="$t('warrior')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.warrior.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Efficace contre la plupart des classes</dd>
                            <dd>Fatigue atténuée</dd>
                            <dd>Capacité à supporter de lourds équipements et objets consommables</dd>
                            <dd>Défense</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Attaque contre les voleurs</dd>
                            <dd>Moins efficace dans les un contre un</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>770 points de vie, 10 force, 9 précision, 5 résistance, 3 agilité</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.clas === 2" key="2">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('magus') }}</h3>
                        <img src="/images/avatars/players/HS24.png" :title="$t('magus')" :alt="$t('magus')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.magus.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Attaques magiques variées et puissantes</dd>
                            <dd>Capacité à toucher à distance</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Consomment plus d'énergie que les autres classes</dd>
                            <dd>Défense</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>365 points de vie, 15 esprit, 3 analyse, 4 talent, 5 vision, 3 résistance, 15 de Ki + sort de base maîtrisé</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.clas === 3" key="3">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('thief') }}</h3>
                        <img src="/images/avatars/players/HS45.png" :title="$t('thief')" :alt="$t('thief')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.thief.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Capacité à voler pour réapprovisionner les troupes</dd>
                            <dd>Défense contre les guerriers</dd>
                            <dd>Infatigable lors de tentative de vols</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Puissance</dd>
                            <dd>Défense magique</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>500 points de vie, 15 agilité, 11 précision,  5 force, 2 analyse</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.clas === 4" key="4">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('healer') }}</h3>
                        <img src="/images/avatars/players/N2.png" :title="$t('healer')" :alt="$t('healer')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.healer.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Excellent soutien en bataille</dd>
                            <dd>Défense magique</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Attaque</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>500 points de vie, 17 talent, 7 esprit, 4 force et 9 de Ki</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.clas === 5" key="5">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('analyst') }}</h3>
                        <img src="/images/avatars/players/C16.png" :title="$t('analyst')" :alt="$t('analyst')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.analyst.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Classe furtive, vous ne laissez aucune trace de votre passage</dd>
                            <dd>Permet d'élaborer de multiples stratégies menant à la victoire</dd>
                            <dd>Défense générale</dd>
                            <dd>Soutien</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Attaque</dd>
                            <dd>Gestion très difficile</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>500 points de vie, 15 analyse, 5 vision,  5 force, 3 agilité, 3 résistance et 4 précision</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.clas === 6" key="6">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('ranger') }}</h3>
                        <img src="/images/avatars/players/C16.png" :title="$t('ranger')" :alt="$t('ranger')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.ranger.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>

                            <dt>{{ $t('register.weakness') }}</dt>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>500 points de vie, 15 vision, 4 agilité, 4 de précision, 6 force, 2 résistance et 4 en esprit</dd>
                        </dl>
                    </div>
                </div>
            </transition>

            <div>
                <p>
                    A présent, choisis la race et l'apparence de ton personnage.
                </p>
                <div class="alert alert-warning" role="alert">
                    L'apparence de ton personnage n'a d'importance que pour la classe <strong>Mage</strong> car chaque race possède des sorts différents.
                    Fais donc bien attention au choix de la race de ton personnage si tu es mage.
                    Dans le cas contraire, choisis simplement l'apparence en fonction de tes goûts sans prendre en compte les descriptions des races.
                </div>
            </div>

            <div>
                <table class="table-apparence">
                    <tbody>
                        <tr>
                            <td align="center" width="75" height="75" background="/media/map/day/grass_0.png">
                                <img class="perso-images" type="image" :src="selectedImage" border="0">
                            </td>
                            <td align="center" width="10" height="75"></td>
                            <td align="center" width="75" height="75" background="/media/map/day/sand_0.png">
                                <img class="perso-images" type="image" :src="selectedImage" border="0">
                            </td>
                            <td align="center" width="10" height="75"></td>
                            <td align="center" width="75" height="75" background="/media/map/day/ground_0.png">
                                <img class="perso-images" type="image" :src="selectedImage" border="0">
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <bs-group justified>
                        <bs-select
                            v-model="player.race"
                            :options="races"
                            :placeholder="$t('form.choice.appearance')"
                            required>
                        </bs-select>
                    </bs-group>

                    <bs-group justified v-if="player.race !== null">
                        <bs-select
                            v-model="appearanceType"
                            :placeholder="$t('choice.character')"
                            required>
                            <template v-for="value, key in appearances[player.race]">
                                <bs-option :value="key">{{ key }}</bs-option>
                            </template>
                        </bs-select>
                    </bs-group>

                    <bs-group justified v-if="appearanceType !== null && appearances[player.race]">
                        <bs-select
                            v-model="player.image"
                            required>
                            <template v-for="value, key in appearances[player.race][appearanceType]">
                                <bs-option :value="value">{{ key }}</bs-option>
                            </template>
                        </bs-select>
                    </bs-group>
                </div>

                <div class="race-list race-list1">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('humans') }}</h3>
                        <p>
                            <img v-for="image in ['H2', 'H1', 'H5', 'H3', 'H']" :src="`/images/avatars/players/${image}.png`" :title="$t('humans')" :alt="$t('humans')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=1" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.humans.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Sorts spéciaux variés</dd>
                            <dd>Sort de défense et combinable avec les cyborgs</dd>
                            <dd>Soutien exceptionnel</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Derniers sorts trop classiques</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list2 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('human-saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['HS27', 'HS33', 'HS35', 'HS41', 'HS42']" :src="`/images/avatars/players/${image}.png`" :title="$t('human-saiyajins')" :alt="$t('human-saiyajins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=2" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.human-saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>3 sorts de transformation</dd>
                            <dd>Sorts spéciaux dévastateurs</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list3 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('namekians') }}</h3>
                        <p>
                            <img v-for="image in ['N', 'N3', 'N2', 'N8', 'N5']" :src="`/images/avatars/players/${image}.png`" :title="$t('namekians')" :alt="$t('namekians')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=3" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.namekians.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Economie des points de mouvements</dd>
                            <dd>Sorts spéciaux remarquables</dd>
                            <dd>Capable d'imiter d'autres classes</dd>
                            <dd>Sort ultime dévastateur</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list4 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['S6', 'S24', 'S10', 'S18', 'S16']" :src="`/images/avatars/players/${image}.png`" :title="$t('saiyajins')" :alt="$t('saiyajins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=4" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>4 sorts de transformation</dd>
                            <dd>Sorts mystérieux au potentiel caché</dd>
                            <dd>1 sort spécial</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list5 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('aliens') }}</h3>
                        <p>
                            <img v-for="image in ['A17', 'A20', 'A15', 'A14', 'A23']" :src="`/images/avatars/players/${image}.png`" :title="$t('aliens')" :alt="$t('aliens')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=5" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.aliens.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Sorts très variés et handicapant sérieusement l'adversaire</dd>
                            <dd>Défense</dd>
                            <dd>2 transformations</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list6 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('cyborgs') }}</h3>
                        <p>
                            <img v-for="image in ['C2', 'C3', 'C1', 'C4', 'C8']" :src="`/images/avatars/players/${image}.png`" :title="$t('cyborgs')" :alt="$t('cyborgs')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=6" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.cyborgs.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Défense</dd>
                            <dd>Soutien</dd>
                            <dd>Sorts spéciaux</dd>
                            <dd>Consommation de Ki fortement réduite</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Diversité des sorts</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list7 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('majins') }}</h3>
                        <p>
                            <img v-for="image in ['M9', 'M3', 'M2', 'M4', 'M10']" :src="`/images/avatars/players/${image}.png`" :title="$t('majins')" :alt="$t('majins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=7" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.majins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Potentiel offensif infini</dd>
                            <dd>Réssurection</dd>
                            <dd>Economie de points de mouvements</dd>
                            <dd>Soutien grâce au contrôle de Babidi</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Défense</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list8 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('dragons') }}</h3>
                        <p>
                            <img v-for="image in ['D4', 'D3', 'D13', 'D6', 'D8']" :src="`/images/avatars/players/${image}.png`" :title="$t('dragons')" :alt="$t('dragons')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=8" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.dragons.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>Un total de 13 sorts !</dd>
                            <dd>Sort de soutien protecteur</dd>
                            <dd>Sorts spéciaux nombreux, très puissants, variés et inégalables</dd>
                            <dd>Capable d'accroitre sa puissance grâce aux Dragon Ball</dd>
                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>Consommation de Ki la plus élevée de toutes les races</dd>
                        </dl>
                    </div>
                </div>

            </div>

            <div>
                <h2>{{ $t('register.various') }}</h2>
                <div class="form-group">
                    <label class="col-sm-2 control-label required">{{ $t('side') }}</label>
                    <div class="col-sm-10">
                        <bs-group justified>
                            <bs-select
                                v-model="player.side"
                                :options="sides"
                                options-value="value"
                                required>
                            </bs-select>
                        </bs-group>
                    </div>
                </div>

                <div class="col-md-12">
                    <p>Afin de t'épauler un peu dès le début de l'aventure, tu auras à ta disposition ces objets ci-dessous dès ta première connexion au jeu :</p>
                    <ul>
                        <li>2 options de fatigue</li>
                        <li>1 senzu</li>
                        <li>5 baies sauvages</li>
                    </ul>
                </div>

                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default">{{ $t('register.text') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
    import {random} from 'lodash';
    import settings from '~/config/general.config';
    import BsInput from '~components/bootstrap/input.vue';
    import BsSelect from '~components/bootstrap/select.vue';
    import BsOption from '~components/bootstrap/option.vue';
    import BsGroup from '~components/bootstrap/group.vue';
    import api from '~/services/api';
    import {isEmpty} from '~/lib/utils';

    export default {
        middleware: 'anonymous',
        head() {
            return {
                title: this.$t('register.title'),
            };
        },
        components: {
            BsInput,
            BsGroup,
            BsSelect,
            BsOption,
        },
        data() {
            return {
                races: [],
                sides: [],
                classes: [],
                appearanceType: null,
                appearances: {},
                player: {
                    clas: 1,
                    side: 1,
                    race: null,
                    image: null,
                    name: '',
                    login: '',
                    password: '',
                    password_confirm: '',
                    email: '',
                    email_confirm: '',
                },
            };
        },
        computed: {
            selectedImage() {
                let image = this.player.image;
                if (isEmpty(image)) {
                    image = 'S.png';
                }
                return `/images/avatars/players/${image}`;
            },
        },
        methods: {
            submit() {
                api.register(this.player).then(() => {

                }).catch((e) => {

                });
            },
        },
        mounted() {
            this.races = settings.races;
            this.sides = settings.sides;
            this.classes = settings.classes;
            this.player.clas = random(1, 6);
            this.player.side = random(1, 2);
        },
        async asyncData() {
            return api.getAppearanceData().then(res => (
                {
                    appearances: res.data,
                }
            ));
        },
    };
</script>
