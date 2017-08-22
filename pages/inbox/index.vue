<template>
    <div>
        <h1 class="title title-inbox">{{ $t('inbox.title') }}</h1>
        <div id="inbox">
            <div id="inbox-menu">
                <ul class="list-dots">
                    <li>
                        <a href="#" @click.prevent="write()">{{ $t('inbox.write') }}</a>
                    </li>
                    <li v-if="currentPlayer.getGuild().enabled">
                        <a href="#" @click.prevent="writeGuild()">{{ $t('inbox.guild.write') }}</a>
                    </li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="selectDirectory(type.inbox)">{{ $t('inbox.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="selectDirectory(type.outbox)">{{ $t('inbox.outbox') }}</a></li>
                    <li v-if="currentPlayer.getGuild().enabled">
                        <a href="#" @click.prevent="selectDirectory(type.guild)">{{ $t('inbox.guild.outbox') }}</a>
                    </li>

                    <li><a href="#" @click.prevent="selectDirectory(type.archive)">{{ $t('inbox.archive') }}</a></li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="clear(type.inbox)">{{ $t('inbox.clear.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="clear(type.outbox)">{{ $t('inbox.clear.outbox') }}</a></li>
                    <li v-if="currentPlayer.getGuild().enabled">
                        <a href="#" @click.prevent="clear(type.guild)">{{ $t('inbox.clear.guild.outbox') }}</a>
                    </li>
                    <li><a href="#" @click.prevent="clear(type.archive)">{{ $t('inbox.clear.archive') }}</a></li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="clear(type.read)">{{ $t('inbox.clear.read') }}</a></li>
                </ul>

                <p>
                    <img src="/images/inbox/read.png" />{{ $t('inbox.info.read') }}<br/>
                    <img src="/images/inbox/unread.png" />{{ $t('inbox.info.unread') }}<br/>
                    <img src="/images/inbox/deleted.png" />{{ $t('inbox.info.deleted') }}<br/>
                </p>
            </div>

            <div id="inbox-content">
                <template v-if="page === type.loading">
                    Loading...
                </template>
                <template v-else-if="page === type.list">
                    <h2 class="subtitle text-center">
                        <template v-if="directory === type.inbox">
                            {{ $t('inbox.inbox') }}
                        </template>
                        <template v-else-if="directory === type.outbox">
                            {{ $t('inbox.outbox') }}
                        </template>
                        <template v-else-if="directory === type.archive">
                            {{ $t('inbox.archivebox') }}
                        </template>
                    </h2>

                    <Table :columns="getTableColumns()" :data="messages"></Table>
                </template>
                <template v-else-if="page === type.read">
                    <h2 class="subtitle text-center">
                        {{ $t('inbox.read') }}
                    </h2>

                    <Button @click.prevent="back(directory)">
                        {{ $t('inbox.back') }}
                    </Button>

                    <div class="container-fluid">
                        <p>
                            <strong>{{ $t('inbox.info.from') }}</strong>{{ getPlayer(selectedMessage.sender).getDisplayName() }}
                        </p>
                        <p v-if="getPlayer(selectedMessage.sender).id === currentPlayer.id && selectedMessage.sender_directory === type.outbox">
                            <strong>{{ $t('inbox.info.to') }}</strong>{{ getPlayer(selectedMessage.recipient).getDisplayName() }}
                        </p>

                        <p>
                            <strong>{{ $t('inbox.info.date') }}</strong>{{ $moment(selectedMessage.created_at).format('LLL') }}
                        </p>
                        <p>
                            <strong>{{ $t('inbox.info.subject') }}</strong>{{ selectedMessage.subject }}
                        </p>
                        <p>
                            <strong>{{ $t('inbox.info.message') }}</strong><br/>
                            {{ selectedMessage.message }}
                        </p>
                    </div>

                    <div>
                        <Button v-if="selectedMessage.recipient.id === currentPlayer.id" @click.prevent="reply(message.id)">
                            <img src="/images/inbox/reply.png" alt="" /> {{ $t('inbox.reply') }}
                        </Button>

                        <Button @click.prevent="delete(message.id)">
                            <img src="/images/inbox/delete.png" /> {{ $t('inbox.delete') }}
                        </Button>

                        <Button v-if="selectedMessage.can_archive" @click.prevent="archive(message.id)">
                            <img src="/images/inbox/archive.png" /> {{ $t('inbox.archive') }}
                        </Button>
                    </div>
                </template>
                <template v-else-if="page === type.write">
                    <h2 class="subtitle text-center">
                        {{ $t('inbox.write') }}
                    </h2>

                    <Form ref="inboxForm" id="inbox-write-form" >
                        <template v-if="currentMessage === null">
                            <div class="text-center">
                                <Button @click.prevent="addRecipient()">
                                    <Icon type="plus-round" />
                                    {{ $t('form.add.recipient') }}
                                </Button>
                                <div class="clearfix">&nbsp;</div>
                            </div>

                            <div id="recipients">
                                <template v-for="value, key in message.recipients">
                                    <Form-item :label="$t('form.recipient')" :label-width="150" required>
                                        <Input :placeholder="$t('form.recipient')"
                                               v-model="message.recipients[key]"
                                               type="text">
                                        <Button slot="append" icon="close-round" @click.prevent="removeRecipient(key)"/>
                                        </Input>
                                    </Form-item>
                                </template>
                            </div>
                        </template>

                        <Form-item :label="$t('form.subject')" :label-width="150" required>
                            <Input name="subject"
                                   :placeholder="$t('form.subject')"
                                   v-model="message.subject"
                                   type="text" />
                        </Form-item>

                        <Form-item :label="$t('form.message')" :label-width="150" required>
                            <Input name="message"
                                   :rows="4"
                                   :placeholder="$t('form.message')"
                                   v-model="message.message"
                                   type="textarea" />
                        </Form-item>

                        <div class="col-sm-offset-2 col-sm-10">
                            <button @click.prevent="submitMessage()" type="submit">{{ $t('form.send') }}</button>
                        </div>
                    </Form>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import _ from 'lodash';
    import api from '~/services/api';
    import Players from '~/components/mixins/players';

    export default {
        middleware: 'auth',
        mixins: [
            Players,
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
            return {
                subject: null,
                currentMessage: null,
                messages: [],
                selectedMessage: {},
                message: {
                    recipients: [''],
                    subject: '',
                    message: '',
                },
                type: {
                    list: 'list',
                    read: 'read',
                    write: 'write',
                    inbox: 'inbox',
                    outbox: 'outbox',
                    archive: 'archive',
                    loading: 'loading',
                },
                status: {
                    unread: 0,
                    read: 1,
                },
                page: 'list',
                directory: 'inbox',
            };
        },
        methods: {
            getTableColumns() {
                const columns = [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center',
                    },
                    {
                        title: this.$t('inbox.status'),
                        align: 'center',
                        key: 'status',
                        render: (h, params) => {
                            const status = params.row.status === this.status.unread ? 'unread' : 'read';
                            return h(
                                'div',
                                {
                                    domProps: {
                                        innerHTML: `<img src="/images/inbox/${status}.png"/>`,
                                    },
                                },
                            );
                        },
                    },
                    {
                        title: this.$t('inbox.date'),
                        key: 'created_at',
                        render: (h, params) => this.$moment(params.row.created_at).fromNow(),
                    },
                ];

                if (this.directory === this.type.inbox || this.directory === this.type.archive) {
                    columns.push({
                        title: this.$t('inbox.sender'),
                        key: 'sender',
                        render: (h, params) => this.getPlayer(params.row.sender).getDisplayName(),
                    });
                }

                if (this.directory !== this.type.inbox || this.directory === this.type.archive) {
                    columns.push({
                        title: this.$t('inbox.recipient'),
                        key: 'recipient',
                        render: (h, params) => this.getPlayer(params.row.recipient).getDisplayName(),
                    });
                }

                columns.push({
                    title: this.$t('inbox.subject'),
                    key: 'subject',
                });
                columns.push({
                    title: this.$t('inbox.actions'),
                    key: 'action',
                    render: (h, params) => h(
                        'Button',
                        {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                    this.read(params.row.id);
                                },
                            },
                        },
                        this.$t('inbox.read'),
                    ),
                });

                return columns;
            },
            selectDirectory(directory) {
                this.page = this.type.loading;
                api.getInboxDirectory(directory).then((res) => {
                    this.page = this.type.list;
                    this.directory = directory;
                    this.messages = res.data.messages;
                });
            },
            write() {
                this.page = this.type.write;
            },
            read(id) {
                this.page = this.type.loading;
                api.readMessage(id).then((res) => {
                    this.page = this.type.read;
                    this.selectedMessage = res.data.message;
                });
            },
            back(directory) {
                this.selectedMessage = {};
                this.selectDirectory(directory);
            },
            addRecipient() {
                this.message.recipients.push('');
            },
            removeRecipient(index) {
                this.message.recipients.splice(index, 1);
            },
            submitMessage() {
                this.$refs.inboxForm.validate((valid) => {
                    if (valid) {
                        const message = Object.assign({}, this.message);
                        const recipients = [];
                        _.uniq(message.recipients).forEach((r) => {
                            recipients.push({name: r});
                        });
                        message.recipients = recipients;

                        this.page = this.type.loading;
                        api.postMessage({inbox_message: message}).then(() => {
                            this.$Notice.success({
                                title: this.$t('inbox.message.sent', {names: this.message.recipients.join(', ')}),
                            });
                            this.message.subject = '';
                            this.message.message = '';
                            this.message.recipients = [''];
                            this.selectDirectory(this.type.inbox);
                        });
                    } else {
                        this.$Notice.error('Form is not valid');
                    }
                });
            },
        },
        mounted() {
            api.getInboxDirectory().then((res) => {
                this.messages = res.data.messages;
            });
        },
    };
</script>
