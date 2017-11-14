<template>
    <div class="account">
        <h1 class="title title-information">{{ $t('header.settings') }}</h1>
        <Form ref="settingsForm" id="settings-form" :rules="settingsRules" :model="player" :label-width="150">
            <FormItem :label="$t('form.email')" prop="email">
                <Input v-model="player.email"></Input>
            </FormItem>

            <FormItem :label="$t('form.login')" prop="username">
                <Input v-model="player.username"></Input>
            </FormItem>

            <FormItem :label="$t('form.history')" prop="history">
                <Input v-model="player.history" type="textarea" :autosize="{minRows: 2,maxRows: 8}"></Input>
            </FormItem>

            <FormItem :label="$t('form.password')" prop="password">
                <Input type="password" v-model="player.password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem :label="$t('form.passwordConfirm')" prop="password_confirm">
                <Input type="password" v-model="player.password_confirm">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>

            <Button type="primary" @click.prevent="handleSubmit()" long>{{ $t('save') }}</Button>
        </Form>
    </div>
</template>

<script type="text/ecmascript-6">
    import _ from 'lodash';
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import ErrorMixin from '~/components/mixins/error';
    import MessagesMixin from '~/components/mixins/messages';

    export default {
        middleware: 'auth',
        mixins: [
            ErrorMixin,
            MessagesMixin,
        ],
        head() {
            return {
                title: this.$t('account.title'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (_.trim(this.player.password_confirm) !== '') {
                    this.$refs.settingsForm.validateField('password_confirm');
                }
                callback();
            };
            const validatePassCheck = (rule, value, callback) => {
                console.log('here');
                console.log(value);
                console.log(this.player.password);
                if (_.trim(value) !== this.player.password) {
                    callback(new Error(this.$t('field.nomatch')));
                } else {
                    callback();
                }
            };

            return {
                player: {
                    email: '',
                    username: '',
                    history: '',
                    password: '',
                    password_confirm: '',
                },
                settingsRules: {
                    email: [
                        {type: 'email', required: true},
                    ],
                    username: [
                        {type: 'string', required: true},
                    ],
                    history: [
                        {type: 'string', required: false},
                    ],
                    password: [
                        {type: 'string', required: false},
                        {validator: validatePass},
                    ],
                    password_confirm: [
                        {type: 'string', required: false},
                        {validator: validatePassCheck},
                    ],
                },
            };
        },
        beforeMount() {
            this.player = {
                email: this.currentPlayer.email,
                username: this.currentPlayer.username,
                history: this.currentPlayer.history,
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.settingsForm.validate((valid) => {
                    console.log(valid);
                    console.log('here');
                    if (valid) {
                        this.$Loading.start();
                        api.saveSettings({player_settings: this.player}).then(() => {
                            this.$Notice.success({
                                title: this.$t('notice.success'),
                                desc: this.$t('account.saved'),
                            });
                            this.$store.dispatch('fetchPlayer');
                        }).catch((err) => {
                            if (err.response.data.error) {
                                this.$Notice.error({
                                    title: this.$t('notice.error'),
                                    desc: err.response.data.error,
                                });
                            } else {
                                this.$Notice.error({
                                    title: this.$t('notice.error'),
                                    desc: this.$t('notice.generic'),
                                });
                            }
                        });
                        this.$Loading.finish();
                    }
                });
            },
        },
    };
</script>
