<template>
    <div>
        <h1 class="title title-register">{{ $trans('register.text') }}</h1>
        <p>{{ $trans('register.welcome') }}</p>
        <p>{{ $trans('register.intro') }}</p>

        <form id="register-form" class="form-horizontal" method="post" @submit.prevent="register">
            <h2>{{ $trans('register.personalinfo') }}</h2>

            <bs-input name="name"
                      :placeholder="$trans('form.name')"
                      :label="$trans('form.name')"
                      v-model="player.name"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="text" />
            <bs-input name="login"
                      :placeholder="$trans('form.login')"
                      :label="$trans('form.login')"
                      v-model="player.login"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="text" />
            <bs-input name="password"
                      :placeholder="$trans('form.password')"
                      :label="$trans('form.password')"
                      v-model="player.password"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="password" />
            <bs-input name="password_confirm"
                      :placeholder="$trans('form.passwordConfirm')"
                      :label="$trans('form.passwordConfirm')"
                      :match="player.password"
                      v-model="player.password_confirm"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="password" />
            <bs-input name="email"
                      :placeholder="$trans('form.email')"
                      :label="$trans('form.email')"
                      v-model="player.email"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="email" />
            <bs-input name="email"
                      :placeholder="$trans('form.emailConfirm')"
                      :label="$trans('form.emailConfirm')"
                      :match="player.email"
                      v-model="player.email_confirm"
                      label-classes="col-sm-2"
                      container-classes="col-sm-10"
                      required
                      type="email" />

            <h2>{{ $trans('register.speciality') }}</h2>
            <p>{{ $trans('register.specialityIntro') }}</p>

            <div class="form-group">
                <label class="col-sm-2 control-label required">{{ $trans('class') }}</label>
                <div class="col-sm-10">
                    <bs-group justified>
                        <bs-select
                            v-model="player.class"
                            :value.sync="player.class"
                            :options="classes"
                            required>
                        </bs-select>
                    </bs-group>
                </div>
            </div>

            <transition name="fade" mode="out-in">
                <div class="class-list" v-if="player.class === 1" key="1">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('warrior') }}</h3>
                        <img src="/images/avatars/players/M7.png" :title="$trans('warrior')" :alt="$trans('warrior')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.warrior.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Efficace contre la plupart des classes</dd>
                            <dd>Fatigue atténuée</dd>
                            <dd>Capacité à supporter de lourds équipements et objets consommables</dd>
                            <dd>Défense</dd>

                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Attaque contre les voleurs</dd>
                            <dd>Moins efficace dans les un contre un</dd>

                            <dt>{{ $trans('register.stats') }}</dt>
                            <dd>770 points de vie, 10 force, 9 précision, 5 résistance, 3 agilité</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 2" key="2">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('magus') }}</h3>
                        <img src="/images/avatars/players/HS24.png" :title="$trans('magus')" :alt="$trans('magus')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.magus.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Attaques magiques variées et puissantes</dd>
                            <dd>Capacité à toucher à distance</dd>

                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Consomment plus d'énergie que les autres classes</dd>
                            <dd>Défense</dd>

                            <dt>{{ $trans('register.stats') }}</dt>
                            <dd>365 points de vie, 15 esprit, 3 analyse, 4 talent, 5 vision, 3 résistance, 15 de Ki + sort de base maîtrisé</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 3" key="3">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('thief') }}</h3>
                        <img src="/images/avatars/players/HS45.png" :title="$trans('thief')" :alt="$trans('thief')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.thief.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Capacité à voler pour réapprovisionner les troupes</dd>
                            <dd>Défense contre les guerriers</dd>
                            <dd>Infatigable lors de tentative de vols</dd>

                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Puissance</dd>
                            <dd>Défense magique</dd>

                            <dt>{{ $trans('register.stats') }}</dt>
                            <dd>500 points de vie, 15 agilité, 11 précision,  5 force, 2 analyse</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 4" key="4">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('healer') }}</h3>
                        <img src="/images/avatars/players/N2.png" :title="$trans('healer')" :alt="$trans('healer')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.healer.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Excellent soutien en bataille</dd>
                            <dd>Défense magique</dd>

                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Attaque</dd>

                            <dt>{{ $trans('register.stats') }}</dt>
                            <dd>500 points de vie, 17 talent, 7 esprit, 4 force et 9 de Ki</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 5" key="5">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('analyst') }}</h3>
                        <img src="/images/avatars/players/C16.png" :title="$trans('analyst')" :alt="$trans('analyst')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.analyst.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Classe furtive, vous ne laissez aucune trace de votre passage</dd>
                            <dd>Permet d'élaborer de multiples stratégies menant à la victoire</dd>
                            <dd>Défense générale</dd>
                            <dd>Soutien</dd>

                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Attaque</dd>
                            <dd>Gestion très difficile</dd>

                            <dt>{{ $trans('register.stats') }}</dt>
                            <dd>500 points de vie, 15 analyse, 5 vision,  5 force, 3 agilité, 3 résistance et 4 précision</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 6" key="6">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('ranger') }}</h3>
                        <img src="/images/avatars/players/C16.png" :title="$trans('ranger')" :alt="$trans('ranger')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.ranger.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>

                            <dt>{{ $trans('register.weakness') }}</dt>

                            <dt>{{ $trans('register.stats') }}</dt>
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
                            :value.sync="player.race"
                            :options="races"
                            :placeholder="$trans('form.choice.appearance')"
                            required>
                        </bs-select>
                    </bs-group>

                    <bs-group justified v-if="player.race !== null">
                        <bs-select
                            v-model="appearanceType"
                            :placeholder="$trans('choice.character')"
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
                        <h3>{{ $trans('humans') }}</h3>
                        <p>
                            <img v-for="image in ['H2', 'H1', 'H5', 'H3', 'H']" :src="`/images/avatars/players/${image}.png`" :title="$trans('humans')" :alt="$trans('humans')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=1" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.humans.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Sorts spéciaux variés</dd>
                            <dd>Sort de défense et combinable avec les cyborgs</dd>
                            <dd>Soutien exceptionnel</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Derniers sorts trop classiques</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list2 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('human-saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['HS27', 'HS33', 'HS35', 'HS41', 'HS42']" :src="`/images/avatars/players/${image}.png`" :title="$trans('human-saiyajins')" :alt="$trans('human-saiyajins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=2" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.human-saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>3 sorts de transformation</dd>
                            <dd>Sorts spéciaux dévastateurs</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list3 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('namekians') }}</h3>
                        <p>
                            <img v-for="image in ['N', 'N3', 'N2', 'N8', 'N5']" :src="`/images/avatars/players/${image}.png`" :title="$trans('namekians')" :alt="$trans('namekians')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=3" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.namekians.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Economie des points de mouvements</dd>
                            <dd>Sorts spéciaux remarquables</dd>
                            <dd>Capable d'imiter d'autres classes</dd>
                            <dd>Sort ultime dévastateur</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list4 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['S6', 'S24', 'S10', 'S18', 'S16']" :src="`/images/avatars/players/${image}.png`" :title="$trans('saiyajins')" :alt="$trans('saiyajins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=4" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>4 sorts de transformation</dd>
                            <dd>Sorts mystérieux au potentiel caché</dd>
                            <dd>1 sort spécial</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Aucun sort de soutien</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list5 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('aliens') }}</h3>
                        <p>
                            <img v-for="image in ['A17', 'A20', 'A15', 'A14', 'A23']" :src="`/images/avatars/players/${image}.png`" :title="$trans('aliens')" :alt="$trans('aliens')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=5" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.aliens.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Sorts très variés et handicapant sérieusement l'adversaire</dd>
                            <dd>Défense</dd>
                            <dd>2 transformations</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Aucun</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list6 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('cyborgs') }}</h3>
                        <p>
                            <img v-for="image in ['C2', 'C3', 'C1', 'C4', 'C8']" :src="`/images/avatars/players/${image}.png`" :title="$trans('cyborgs')" :alt="$trans('cyborgs')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=6" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.cyborgs.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Défense</dd>
                            <dd>Soutien</dd>
                            <dd>Sorts spéciaux</dd>
                            <dd>Consommation de Ki fortement réduite</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Diversité des sorts</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list7 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('majins') }}</h3>
                        <p>
                            <img v-for="image in ['M9', 'M3', 'M2', 'M4', 'M10']" :src="`/images/avatars/players/${image}.png`" :title="$trans('majins')" :alt="$trans('majins')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=7" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.majins.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Race équilibrée</dd>
                            <dd>Potentiel offensif infini</dd>
                            <dd>Réssurection</dd>
                            <dd>Economie de points de mouvements</dd>
                            <dd>Soutien grâce au contrôle de Babidi</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Défense</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list race-list8 hide">
                    <div class="col-md-3 text-center">
                        <h3>{{ $trans('dragons') }}</h3>
                        <p>
                            <img v-for="image in ['D4', 'D3', 'D13', 'D6', 'D8']" :src="`/images/avatars/players/${image}.png`" :title="$trans('dragons')" :alt="$trans('dragons')" />
                        </p>
                        <p>
                            <a href="infos_race.php?race=8" target="_blank">Voir les sorts</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $trans('register.dragons.intro') }}</p>
                        <dl>
                            <dt>{{ $trans('register.advantages') }}</dt>
                            <dd>Un total de 13 sorts !</dd>
                            <dd>Sort de soutien protecteur</dd>
                            <dd>Sorts spéciaux nombreux, très puissants, variés et inégalables</dd>
                            <dd>Capable d'accroitre sa puissance grâce aux Dragon Ball</dd>
                            <dt>{{ $trans('register.weakness') }}</dt>
                            <dd>Consommation de Ki la plus élevée de toutes les races</dd>
                        </dl>
                    </div>
                </div>

            </div>

            <div>
                <h2>{{ $trans('register.various') }}</h2>
                <div class="form-group">
                    <label class="col-sm-2 control-label required">{{ $trans('side') }}</label>
                    <div class="col-sm-10">
                        <bs-group justified>
                            <bs-select
                                v-model="player.side"
                                :value.sync="player.side"
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
                    <button type="submit" class="btn btn-default">{{ $trans('register.text') }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
import settings from '~/config/general.config';
import BsInput from '~components/bootstrap/input.vue';
import BsSelect from '~components/bootstrap/select.vue';
import BsOption from '~components/bootstrap/option.vue';
import BsGroup from '~components/bootstrap/group.vue';
import api from '../services/api';
import {isEmpty} from '../lib/utils';

export default {
    middleware: 'anonymous',
    head: {
        title: 'Register',
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
                class: 1,
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
        async submit() {
            await api.register(this.player).then(() => {

            }).catch((e) => {

            });
        },
    },
    async mounted() {
        this.races = settings.races;
        this.sides = settings.sides;
        this.classes = settings.classes;
        await api.getAppearanceData().then((res) => {
            this.appearances = res.data;
        });

        this.$nextTick(() => {
            this.player.class = Math.floor((Math.random() * 6) + 1);
            this.player.side = Math.floor((Math.random() * 2) + 1);
        });
    },
};
</script>
