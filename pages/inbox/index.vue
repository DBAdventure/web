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
                <template v-if="page === type.list">
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

                    <table class="table table-striped" v-if="messages.lenght > 0">
                        <colgroup>
                            <col class="col-md-1"/>
                            <col class="col-md-3"/>
                            <col />
                            <col />
                            <col class="col-md-1"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>{{ $t('inbox.status') }}</th>
                                <th>{{ $t('inbox.date') }}</th>
                                <template v-if="directory === type.inbox">
                                    <th>{{ $t('inbox.sender') }}</th>
                                </template>
                                <template v-else-if="directory === type.archive">
                                    <th >{{ $t('inbox.sender') }}</th>
                                    <th>{{ $t('inbox.recipient') }}</th>
                                </template>
                                <template v-else>
                                    <th>{{ $t('inbox.recipient') }}</th>
                                </template>
                                <th>{{ $t('inbox.subject') }}</th>
                                <th>{{ $t('inbox.actions') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="message in messages">
                                <td class="text-center">
                                    <img v-if="message.status === status.unread" src="/images/inbox/unread.png" />
                                    <img v-else src="/images/inbox/read.png" />
                                </td>
                                <td>{{ $moment(message.createdAt).format('ll') }}</td>
                                <template v-if="directory === type.inbox">
                                    <td>{{ message.sender.displayName }}</td>
                                </template>
                                <template v-else-if="directory === type.archive">
                                    <td>{{ message.sender.displayName }}</td>
                                    <td>{{ message.recipient.displayName }}</td>
                                </template>
                                <template v-else>
                                    <td>{{ message.recipient.displayName }}</td>
                                </template>
                                <td>{{ message.subject }}</td>
                                <td><a @click.prevent="read(message.id)" href="#">{{ $t('inbox.read') }}</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>
                        {{ $t('inbox.no.messages') }}
                    </p>

                </template>
                <template v-else-if="page === type.read">
                    <h2 class="subtitle text-center">
                        {{ $t('inbox.read') }}
                    </h2>

                    <div class="container-fluid">
                        <p>
                            <strong>{{ $t('inbox.info.from') }}</strong>{{ message.sender.name }}
                        </p>
                        <p v-if="message.sender.id === currentPlayer.id && message.sender_directory === type.outbox">
                            <strong>{{ $t('inbox.info.to') }}</strong>{{ message.recipient.name }}
                        </p>

                        <p>
                            <strong>{{ $t('inbox.info.date') }}</strong>{{ message.createdAt | date }}
                        </p>
                        <p>
                            <strong>{{ $t('inbox.info.subject') }}</strong>{{ message.subject }}
                        </p>
                        <p>
                            <strong>{{ $t('inbox.info.message') }}</strong><br/>
                            {{ message.message | nl2br }}
                        </p>
                    </div>

                    <div class="container-fluid">
                        <div class="col-lg-4">
                            <button class="btn btn-default" @click.prevent="back(directory)">
                                {{ $t('inbox.back') }}
                            </button>
                        </div>
                        <div class="col-lg-8 text-right">
                            <a v-if="message.can_reply" class="btn btn-default" @click.prevent="reply(message.id)">
                                <img src="/images/inbox/reply.png" alt="" /> {{ $t('inbox.reply') }}
                            </a>

                            <button class="btn btn-default" @click.prevent="delete(message.id)">
                                <img src="/images/inbox/delete.png" /> {{ $t('inbox.delete') }}
                            </button>

                            <button v-if="message.can_archive" class="btn btn-default" @click.prevent="archive(message.id)">
                                <img src="/images/inbox/archive.png" /> {{ $t('inbox.archive') }}
                            </button>
                        </div>
                    </div>
                </template>
                <template v-else-if="page === type.write">
                    <h2 class="subtitle text-center">
                        {{ $t('inbox.write') }}
                    </h2>


                    <Form @submit.prevent="submitMessage()">
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
                                   v-model="subject"
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
                            <button type="submit" class="btn btn-default">{{ $t('form.send') }}</button>
                        </div>
                    </Form>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import api from '~/services/api';

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
        },
        data() {
            return {
                subject: null,
                currentMessage: null,
                messages: [],
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
                },
                page: 'list',
                directory: 'inbox',
            };
        },
        methods: {
            selectDirectory(directory) {
                api.getInboxDirectory(directory).then((res) => {
                    this.page = 'list';
                    this.directory = directory;
                    this.messages = res.data.messages;
                });
            },
            write() {
                this.page = 'write';
            },
            addRecipient() {
                this.message.recipients.push('');
            },
            removeRecipient(index) {
                this.message.recipients.splice(index, 1);
            },
        },
        asyncData() {
            return api.getInboxDirectory().then(res => (
                {
                    messages: res.data.messages,
                }
            ));
        },
    };
</script>
