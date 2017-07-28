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
                    <li><a href="#" @click.prevent="inbox()">{{ $t('inbox.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="outbox()">{{ $t('inbox.outbox') }}</a></li>
                    <li v-if="currentPlayer.getGuild().enabled">
                        <a href="#" @click.prevent="outbox(true)">{{ $t('inbox.guild.outbox') }}</a>
                    </li>

                    <li><a href="#" @click.prevent="archive()">{{ $t('inbox.archive') }}</a></li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="clear('inbox')">{{ $t('inbox.clear.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="clear('outbox')">{{ $t('inbox.clear.outbox') }}</a></li>
                    <li v-if="currentPlayer.getGuild().enabled">
                        <a href="#" @click.prevent="clear('inbox', true)">{{ $t('inbox.clear.guild.outbox') }}</a>
                    </li>
                    <li><a href="#" @click.prevent="clear('archive')">{{ $t('inbox.clear.archive') }}</a></li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="clear('read')">{{ $t('inbox.clear.read') }}</a></li>
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

                    <table class="table table-striped">
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
                                    <img v-if="message.status === status.unread" src="{{ asset('bundles/dbagame/images/inbox/unread.png') }}" />
                                    <img v-else src="{{ asset('bundles/dbagame/images/inbox/read.png') }}" />
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
                </template>
                <template v-else-if="page === type.read">
                    <h2 class="subtitle text-center">
                        {{ $t('inbox.read') }}
                    </h2>

                    <div class="container-fluid">
                        <p>
                            <strong>{{ $('inbox.info.from') }}</strong>{{ message.sender.name }}
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
                            <button class="btn btn-default" @click.prevent="back(directory ? `inbox.${directory}` : 'inbox')">
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


                    <form @submit.prevent="submitMessage()">
                        <template v-if="currentMessage === null">
                            <div class="text-center">
                                <button class="btn btn-default btn-add" @click.prevent="addRecipient()">
                                    <span class="glyphicon glyphicon-plus"></span>
                                    {{ $t('form.add.recipient') }}
                                </button>
                                <div class="clearfix">&nbsp;</div>
                            </div>

                            <div id="recipients" data-prototype="{{ helper.widget_prototype(form.recipients, 'form.remove') | escape }}">
                                <template v-for="i, recipient in messages.recipients">
                                    <div data-content="{{ i }}">
                                        <div class="form-group">
                                            <Form-item :label="$t('form.recipient')" :label-width="150" required>
                                                <Input :placeholder="$t('form.recipient')"
                                                       v-model="recipients[i]"
                                                       type="text" />
                                            </Form-item>
                                            <div class="col-sm-2 text-right">
                                                <button type="button" class="btn btn-default btn-sm btn-remove" @click.prevent="removeRecipient(i)">
                                                    <span class="glyphicon glyphicon-remove btn-remove"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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
                                   v-model="message"
                                   type="textarea" />
                        </Form-item>

                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-default">{{ $('form.send') }}</button>
                        </div>
                    </form>
                </template>
            </div>
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
        },
        data() {
            return {
                subject: null,
                message: null,
                currentMessage: null,
                messages: [],
            };
        },
        mounted() {

        },
        asyncData() {

        },
    };
</script>
