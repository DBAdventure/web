<template>
    <div>
        <h1 class="title title-default">{{ $t('guild.create') }}</h1>

        <Form ref="createGuildForm" id="guild-create-form" class="form-horizontal" :rules="guildRules" :model="guild">
            <Form-item :label="$t('form.name')" :label-width="150" prop="name" required>
                <Input name="name"
                       :placeholder="$t('form.name')"
                       v-model="guild.name"
                       type="text" />
            </Form-item>
            <Form-item :label="$t('form.shortName')" :label-width="150" prop="shortName" required>
                <Input name="shortName"
                       :maxlength="5"
                       :placeholder="$t('form.shortName')"
                       v-model="guild.shortName"
                       type="text" />
            </Form-item>
            <Form-item :label="$t('form.history')" :label-width="150" prop="history" required>
                <Input name="history"
                       :placeholder="$t('form.history')"
                       v-model="guild.history"
                       :rows="4"
                       type="textarea" />
            </Form-item>
            <div>
                <div class="text-right">
                    <Button type="primary" @click.prevent="handleSubmit()" long>{{ $t('form.create') }}</Button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';
    import ErrorMixin from '~/components/mixins/error';
    import GuildMenu from '~/components/guild/menu';

    export default {
        middleware: 'auth',
        mixins: [
            ErrorMixin,
        ],
        components: {
            GuildMenu,
        },
        head() {
            return {
                title: this.$t('guild.create'),
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        data() {
            return {
                guild: {
                    name: '',
                    shortName: '',
                    history: '',
                },
                guildRules: {
                    name: [
                        {type: 'string', required: true, message: this.$t('field.required.name')},
                    ],
                    shortName: [
                        {type: 'string', required: true, min: 3, max: 5, message: this.$t('field.required.shortName')},
                    ],
                    history: [
                        {type: 'string', required: true, message: this.$t('field.required.history')},
                    ],
                },
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.createGuildForm.validate((valid) => {
                    if (valid) {
                        api.createGuild({guild_create: this.guild}).then(() => {
                            this.$Notice.success({
                                title: this.$t('notice.success'),
                                desc: this.$t('guild.created'),
                            });
                            this.$router.push('/guild');
                        }).catch(() => {
                            this.raiseError();
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
    };
</script>
