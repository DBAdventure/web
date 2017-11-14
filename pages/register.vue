<template>
    <div>
        <h1 class="title title-register">{{ $t('register.text') }}</h1>
        <p>{{ $t('register.welcome') }}</p>
        <p>{{ $t('register.intro') }}</p>

        <Form ref="registerForm" id="register-form" class="form-horizontal" :rules="registerRules" :model="player">
            <h2>{{ $t('register.personalinfo') }}</h2>

            <Form-item :label="$t('form.pseudo')" :label-width="150" prop="name" required>
                <Input name="name"
                       :placeholder="$t('form.pseudo')"
                       v-model="player.name"
                       type="text" />
            </Form-item>
            <Form-item :label="$t('form.login')" :label-width="150" prop="username" required>
                <Input name="username"
                       :placeholder="$t('form.login')"
                       v-model="player.username"
                       type="text" />
            </Form-item>
            <Form-item :label="$t('form.password')" :label-width="150" prop="password" required>
                <Input name="password"
                       :placeholder="$t('form.password')"
                       v-model="player.password"
                       type="password" />
            </Form-item>
            <Form-item :label="$t('form.passwordConfirm')" :label-width="150" prop="password_confirm" required>
                <Input name="password_confirm"
                       :placeholder="$t('form.passwordConfirm')"
                       v-model="player.password_confirm"
                       type="password" />
            </Form-item>
            <Form-item :label="$t('form.email')" :label-width="150" prop="email" required>
                <Input name="email"
                       :placeholder="$t('form.email')"
                       v-model="player.email"
                       type="text" />
            </Form-item>
            <Form-item :label="$t('form.emailConfirm')" :label-width="150" prop="email_confirm" required>
                <Input name="email_confirm"
                       :placeholder="$t('form.emailConfirm')"
                       v-model="player.email_confirm"
                       type="text" />
            </Form-item>

            <h2>{{ $t('register.speciality') }}</h2>
            <p>{{ $t('register.specialityIntro') }}</p>

            <div class="form-group">
                <label class="col-sm-2 control-label required">{{ $t('class') }}</label>
                <div class="col-sm-10">
                    <Select
                        v-model="player.class"
                        required>
                        <Option v-for="klass in classes" :key="klass.label" :value="klass.value">{{ $t(klass.label) }}</Option>
                    </select>
                </div>
            </div>

            <transition name="fade" mode="out-in">
                <div class="class-list" v-if="player.class === 1" key="1">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('warrior') }}</h3>
                        <img src="/images/avatars/players/M7.png" :title="$t('warrior')" :alt="$t('warrior')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.warrior.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.warrior.advantages[0]') }}</dd>
                            <dd>{{ $t('register.warrior.advantages[1]') }}</dd>
                            <dd>{{ $t('register.warrior.advantages[2]') }}</dd>
                            <dd>{{ $t('register.warrior.advantages[3]') }}</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>{{ $t('register.warrior.weakness[0]') }}</dd>
                            <dd>{{ $t('register.warrior.advantages[1]') }}</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>{{ $t('register.warrior.stats') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 2" key="2">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('magus') }}</h3>
                        <img src="/images/avatars/players/HS24.png" :title="$t('magus')" :alt="$t('magus')"/>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.magus.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.magus.advantages[0]') }}</dd>
                            <dd>{{ $t('register.magus.advantages[1]') }}</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>{{ $t('register.magus.weakness[0]') }}</dd>
                            <dd>{{ $t('register.magus.weakness[1]') }}</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>{{ $t('register.magus.stats') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 3" key="3">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('thief') }}</h3>
                        <img src="/images/avatars/players/HS45.png" :title="$t('thief')" :alt="$t('thief')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.thief.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.thief.advantages[0]') }}</dd>
                            <dd>{{ $t('register.thief.advantages[1]') }}</dd>
                            <dd>{{ $t('register.thief.advantages[2]') }}</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>{{ $t('register.thief.weakness[0]') }}</dd>
                            <dd>{{ $t('register.thief.weakness[1]') }}</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>{{ $t('register.thief.stats') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 4" key="4">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('healer') }}</h3>
                        <img src="/images/avatars/players/N2.png" :title="$t('healer')" :alt="$t('healer')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.healer.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.healer.advantages[0]') }}</dd>
                            <dd>{{ $t('register.healer.advantages[1]') }}</dd>
                            <dd></dd>
                            <dd></dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>{{ $t('register.healer.weakness[0]') }}</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>{{ $t('register.healer.stats') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 5" key="5">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('analyst') }}</h3>
                        <img src="/images/avatars/players/C16.png" :title="$t('analyst')" :alt="$t('analyst')" />
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.analyst.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.analyst.advantages[0]') }}</dd>
                            <dd>{{ $t('register.analyst.advantages[1]') }}</dd>
                            <dd>{{ $t('register.analyst.advantages[2]') }}</dd>
                            <dd>{{ $t('register.analyst.advantages[3]') }}</dd>

                            <dt>{{ $t('register.weakness') }}</dt>
                            <dd>{{ $t('register.analyst.weakness[0]') }}</dd>
                            <dd>{{ $t('register.analyst.weakness[1]') }}</dd>

                            <dt>{{ $t('register.stats') }}</dt>
                            <dd>{{ $t('register.analyst.stats') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="class-list" v-if="player.class === 6" key="6">
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
                    {{ $t('register.appearance.title') }}
                </p>
                <div class="alert alert-warning" role="alert">
                    <p v-html="$t('register.appearance.warning')"></p>
                </div>
            </div>

            <div>
                <table class="table-appearance">
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
                    <Select
                        v-model="player.race"
                        :placeholder="$t('form.choice.appearance')"
                        required>
                        <Option v-for="race in races" :key="race.value" :value="race.value">{{ $t(race.label) }}</Option>
                    </Select>

                    <Select
                        v-if="player.race !== null"
                        v-model="player.appearance.type"
                        :placeholder="$t('choice.character')"
                        clearable
                        required>
                        <Option v-for="value, key in appearances[player.race]" :key="key" :value="key">{{ value.label }}</Option>
                    </Select>

                    <Select
                        v-if="player.appearance.type !== null && appearances[player.race]"
                        v-model="player.appearance.image"
                        required>
                        <Option v-for="value, key in appearances[player.race][player.appearance.type].value" :key="key" :value="value">{{ key }}</Option>
                    </Select>
                </div>

                <div class="race-list" v-if="player.race === 1">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('humans') }}</h3>
                        <p>
                            <img v-for="image in ['H2', 'H1', 'H5', 'H3', 'H']" :src="`/images/avatars/players/${image}.png`" :title="$t('humans')" :alt="$t('humans')" />
                        </p>
                        <p>
                            <a href="#1">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.humans.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.humans.advantages[0]') }}</dd>
                            <dd>{{ $t('register.humans.advantages[1]') }}</dd>
                            <dd>{{ $t('register.humans.advantages[2]') }}</dd>
                            <dd>{{ $t('register.humans.advantages[3]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 2">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('human-saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['HS27', 'HS33', 'HS35', 'HS41', 'HS42']" :src="`/images/avatars/players/${image}.png`" :title="$t('human-saiyajins')" :alt="$t('human-saiyajins')" />
                        </p>
                        <p>
                            <a href="#2">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.human-saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.human-saiyajins.advantages[0]') }}</dd>
                            <dd>{{ $t('register.human-saiyajins.advantages[1]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 3">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('namekians') }}</h3>
                        <p>
                            <img v-for="image in ['N', 'N3', 'N2', 'N8', 'N5']" :src="`/images/avatars/players/${image}.png`" :title="$t('namekians')" :alt="$t('namekians')" />
                        </p>
                        <p>
                            <a href="#3">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.namekians.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.namekians.advantages[0]') }}</dd>
                            <dd>{{ $t('register.namekians.advantages[1]') }}</dd>
                            <dd>{{ $t('register.namekians.advantages[2]') }}</dd>
                            <dd>{{ $t('register.namekians.advantages[3]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 4">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('saiyajins') }}</h3>
                        <p>
                            <img v-for="image in ['S6', 'S24', 'S10', 'S18', 'S16']" :src="`/images/avatars/players/${image}.png`" :title="$t('saiyajins')" :alt="$t('saiyajins')" />
                        </p>
                        <p>
                            <a href="#4">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.saiyajins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.saiyajins.advantages[0]') }}</dd>
                            <dd>{{ $t('register.saiyajins.advantages[1]') }}</dd>
                            <dd>{{ $t('register.saiyajins.advantages[2]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 5">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('aliens') }}</h3>
                        <p>
                            <img v-for="image in ['A17', 'A20', 'A15', 'A14', 'A23']" :src="`/images/avatars/players/${image}.png`" :title="$t('aliens')" :alt="$t('aliens')" />
                        </p>
                        <p>
                            <a href="#5">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.aliens.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.aliens.advantages[0]') }}</dd>
                            <dd>{{ $t('register.aliens.advantages[1]') }}</dd>
                            <dd>{{ $t('register.aliens.advantages[2]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 6">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('cyborgs') }}</h3>
                        <p>
                            <img v-for="image in ['C2', 'C3', 'C1', 'C4', 'C8']" :src="`/images/avatars/players/${image}.png`" :title="$t('cyborgs')" :alt="$t('cyborgs')" />
                        </p>
                        <p>
                            <a href="#6">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.cyborgs.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.cyborgs.advantages[0]') }}</dd>
                            <dd>{{ $t('register.cyborgs.advantages[1]') }}</dd>
                            <dd>{{ $t('register.cyborgs.advantages[2]') }}</dd>
                            <dd>{{ $t('register.cyborgs.advantages[3]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 7">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('majins') }}</h3>
                        <p>
                            <img v-for="image in ['M9', 'M3', 'M2', 'M4', 'M10']" :src="`/images/avatars/players/${image}.png`" :title="$t('majins')" :alt="$t('majins')" />
                        </p>
                        <p>
                            <a href="#7">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.majins.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.majins.advantages[0]') }}</dd>
                            <dd>{{ $t('register.majins.advantages[1]') }}</dd>
                            <dd>{{ $t('register.majins.advantages[2]') }}</dd>
                            <dd>{{ $t('register.majins.advantages[3]') }}</dd>
                            <dd>{{ $t('register.majins.advantages[4]') }}</dd>
                        </dl>
                    </div>
                </div>

                <div class="race-list" v-if="player.race === 8">
                    <div class="col-md-3 text-center">
                        <h3>{{ $t('dragons') }}</h3>
                        <p>
                            <img v-for="image in ['D4', 'D3', 'D13', 'D6', 'D8']" :src="`/images/avatars/players/${image}.png`" :title="$t('dragons')" :alt="$t('dragons')" />
                        </p>
                        <p>
                            <a href="#8">{{ $t('register.viewSpell') }}</a>
                        </p>
                    </div>
                    <div class="col-md-9">
                        <p>{{ $t('register.dragons.intro') }}</p>
                        <dl>
                            <dt>{{ $t('register.advantages') }}</dt>
                            <dd>{{ $t('register.dragons.advantages[0]') }}</dd>
                            <dd>{{ $t('register.dragons.advantages[1]') }}</dd>
                            <dd>{{ $t('register.dragons.advantages[2]') }}</dd>
                            <dd>{{ $t('register.dragons.advantages[3]') }}</dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div>
                <h2>{{ $t('register.various') }}</h2>
                <div class="form-group">
                    <label class="col-sm-2 control-label required">{{ $t('side') }}</label>
                    <div class="col-sm-10">
                        <Select
                            v-model="player.side"
                            required>
                            <Option v-for="side in sides" :key="side.label" :value="side.value">{{ $t(side.label) }}</Option>
                        </Select>
                    </div>
                </div>

                <div class="col-md-12">
                    <p>{{ $t('register.objects.title') }}</p>
                    <ul>
                        <li>{{ $t('register.objects.objects[0]') }}</li>
                        <li>{{ $t('register.objects.objects[1]') }}</li>
                        <li>{{ $t('register.objects.objects[2]') }}</li>
                    </ul>
                </div>

                <div class="col-sm-offset-2 col-sm-10">
                    <Button type="primary" @click.prevent="handleSubmit()" long>{{ $t('register.text') }}</Button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script type="text/ecmascript-6">
    import {random} from 'lodash';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import ErrorMixin from '~/components/mixins/error';
    import {isEmpty, entries} from '~/lib/utils';

    export default {
        mixins: [
            ErrorMixin,
        ],
        middleware: 'anonymous',
        head() {
            return {
                title: this.$t('register.title'),
            };
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('field.empty')));
                } else {
                    if (this.player.password_confirm !== '') {
                        this.$refs.registerForm.validateField('password_confirm');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('field.empty')));
                } else if (value !== this.player.password) {
                    callback(new Error(this.$t('field.nomatch')));
                } else {
                    callback();
                }
            };
            const validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('field.empty'));
                } else {
                    if (this.player.email_confirm !== '') {
                        this.$refs.registerForm.validateField('email_confirm');
                    }
                    callback();
                }
            };
            const validateEmailCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('field.empty'));
                } else if (value !== this.player.email) {
                    callback(new Error(this.$t('field.nomatch')));
                } else {
                    callback();
                }
            };

            return {
                races: [],
                sides: [],
                classes: [],
                appearances: {},
                player: {
                    class: 1,
                    side: 1,
                    race: null,
                    name: '',
                    username: '',
                    password: '',
                    password_confirm: '',
                    email: '',
                    email_confirm: '',
                    appearance: {
                        type: null,
                        image: null,
                    },
                },
                registerRules: {
                    name: [
                        {type: 'string', required: true},
                    ],
                    username: [
                        {type: 'string', required: true},
                    ],
                    password: [
                        {type: 'string', required: true},
                        {validator: validatePass},
                    ],
                    password_confirm: [
                        {type: 'string', required: true},
                        {validator: validatePassCheck},
                    ],
                    email: [
                        {type: 'email', required: true},
                        {validator: validateEmail},
                    ],
                    email_confirm: [
                        {type: 'email', required: true},
                        {validator: validateEmailCheck},
                    ],
                },
            };
        },
        computed: {
            selectedImage() {
                let image = this.player.appearance.image;
                if (isEmpty(image)) {
                    if (this.player.race === 1) {
                        image = 'H.png';
                    } else if (this.player.race === 2) {
                        image = 'HS.png';
                    } else if (this.player.race === 3) {
                        image = 'N.png';
                    } else if (this.player.race === 4) {
                        image = 'S.png';
                    } else if (this.player.race === 5) {
                        image = 'A.png';
                    } else if (this.player.race === 6) {
                        image = 'C.png';
                    } else if (this.player.race === 7) {
                        image = 'M.png';
                    } else if (this.player.race === 8) {
                        image = 'D.png';
                    } else {
                        image = 'S.png';
                    }
                }

                return `/images/avatars/players/${image}`;
            },
        },
        watch: {
            'player.race': function onRaceChange() {
                this.player.appearance.type = null;
                this.player.appearance.image = null;
            },
            'player.appearance.type': function onTypeChange() {
                this.player.appearance.image = null;
            },
        },
        methods: {
            handleSubmit() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        api.register({player_registration: this.player}).then(() => {
                            this.$Notice.success({
                                title: this.$t('account.created.title'),
                                desc: this.$t('account.created.description'),
                            });
                            this.$router.push('/');
                        }).catch((e) => {
                            if (!isEmpty(e.response.data.error)) {
                                /* eslint-disable no-restricted-syntax */
                                for (const [key, messages] of entries(e.response.data.error)) {
                                    this.$Notice.error({
                                        title: this.$t(key),
                                        desc: messages.join('.\n'),
                                    });
                                }
                                /* eslint-enable no-restricted-syntax */
                            } else {
                                this.raiseError();
                            }
                        });
                    } else {
                        this.$Notice.error({
                            title: this.$t('notice.error'),
                            desc: this.$t('form.invalid'),
                        });
                    }
                });
            },
        },
        mounted() {
            this.classes = settings.classes;
            this.player.class = random(1, 6);
            this.player.race = random(1, 8);
            this.player.side = random(1, 2);
        },
        asyncData() {
            return api.getAppearanceData().then(res => (
                {
                    appearances: res.data,
                    races: settings.races,
                    sides: settings.sides,
                }
            ));
        },
    };
</script>
