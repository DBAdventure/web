<template>
  <div>
    <h1 class="title title-inbox">
      {{ $t('inbox.title') }}
    </h1>
    <div id="inbox">
      <div id="inbox-menu">
        <ul class="list-dots clearfix">
          <li>
            <a
              href="#"
              @click.prevent="writeMessage()"
            >{{ $t('inbox.write') }}</a>
          </li>
        </ul>
        <ul class="list-dots clearfix">
          <li>
            <a
              href="#"
              @click.prevent="selectDirectory(type.inbox)"
            >{{ $t('inbox.inbox') }}</a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="selectDirectory(type.outbox)"
            >{{ $t('inbox.outbox') }}</a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="selectDirectory(type.archive)"
            >{{ $t('inbox.archive') }}</a>
          </li>
        </ul>
        <ul class="list-dots clearfix">
          <li>
            <a
              href="#"
              @click.prevent="clearMessages(type.inbox)"
            >{{ $t('inbox.clear.inbox') }}</a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="clearMessages(type.outbox)"
            >{{ $t('inbox.clear.outbox') }}</a>
          </li>
          <li>
            <a
              href="#"
              @click.prevent="clearMessages(type.archive)"
            >{{ $t('inbox.clear.archive') }}</a>
          </li>
        </ul>

        <ul class="list-dots clearfix">
          <li>
            <a
              href="#"
              @click.prevent="clearMessages(type.read)"
            >{{ $t('inbox.clear.read') }}</a>
          </li>
        </ul>

        <p>
          <img src="/images/inbox/read.png">{{ $t('inbox.info.read') }}<br>
          <img src="/images/inbox/unread.png">{{ $t('inbox.info.unread') }}<br>
          <img src="/images/inbox/deleted.png">{{ $t('inbox.info.deleted') }}<br>
        </p>
      </div>

      <div id="inbox-content">
        <template v-if="page === type.loading">
          {{ $t('strap.loading') }}
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

          <b-table
            :fields="getTableColumns()"
            :items="messages"
            select-mode="multi"
            selectable
          >
            <template v-slot:cell(selected)="{rowSelected}">
              <template v-if="rowSelected">
                <span aria-hidden="true">&check;</span>
                <span class="sr-only">Selected</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>

            <template v-slot:cell(status)="data">
              <img :src="`/images/inbox/${data.value === status.unread ? 'unread' : 'read'}.png`" />
            </template>

            <template v-slot:cell(created_at)="data">
              {{ $moment(data.value).fromNow() }}
            </template>

            <template v-slot:cell(sender)="data">
              {{ getPlayer(data.value).getDisplayName() }}
            </template>

            <template v-slot:cell(recipient)="data">
              {{ getPlayer(data.value).getDisplayName() }}
            </template>

            <template v-slot:cell(action)="data">
              <b-button
                variant="primary"
                size="sm"
                @click="readMessage(data.item.id)"
              >
                {{ $t('inbox.read') }}
              </b-button>
            </template>
          </b-table>
        </template>
        <template v-else-if="page === type.read">
          <h2 class="subtitle text-center">
            {{ $t('inbox.read') }}
          </h2>

          <div class="container-fluid">
            <p>
              <strong>{{ $t('inbox.info.from') }}</strong>{{ getPlayer(currentMessage.sender).getDisplayName() }}
            </p>
            <p v-if="getPlayer(currentMessage.sender).id === currentPlayer.id && currentMessage.sender_directory === type.outbox">
              <strong>{{ $t('inbox.info.to') }}</strong>{{ getPlayer(currentMessage.recipient).getDisplayName() }}
            </p>

            <p>
              <strong>{{ $t('inbox.info.date') }}</strong>{{ $moment(currentMessage.created_at).format('LLL') }}
            </p>
            <p>
              <strong>{{ $t('inbox.info.subject') }}</strong>{{ currentMessage.subject }}
            </p>
            <p>
              <strong>{{ $t('inbox.info.message') }}</strong><br>
              <template v-for="(line, index) in currentMessage.message.split('\n')">
                {{ line }}<br :key="index">
              </template>
            </p>
          </div>

          <div>
            <b-button @click.prevent="back(directory)">
              {{ $t('inbox.back') }}
            </b-button>

            <b-button
              v-if="currentMessage.recipient.id === currentPlayer.id"
              @click.prevent="replyMessage()"
            >
              <img
                src="/images/inbox/reply.png"
                alt=""
              /> {{ $t('inbox.reply') }}
            </b-button>

            <b-button @click.prevent="deleteMessage()">
              <img src="/images/inbox/delete.png" /> {{ $t('inbox.delete') }}
            </b-button>

            <b-button
              v-if="currentMessage.can_archive"
              @click.prevent="archiveMessage()"
            >
              <img src="/images/inbox/archive.png" /> {{ $t('inbox.archive') }}
            </b-button>
          </div>
        </template>
        <template v-else-if="page === type.write">
          <h2 class="subtitle text-center">
            {{ $t('inbox.write') }}
          </h2>

          <b-form>
            <template v-if="currentMessage === null">
              <div class="text-center">
                <b-button @click.prevent="addRecipient()">
                  <b-icon icon="plus" />
                  {{ $t('form.add.recipient') }}
                </b-button>

                <div class="clearfix">
                  &nbsp;
                </div>
              </div>

              <div id="recipients">
                <b-form-group
                  v-for="(value, key) in message.recipients"
                  :key="key"
                  :label="$t('form.recipient')"
                  :label-cols-lg="3"
                  required
                >
                  <b-form-input
                    :placeholder="$t('form.recipient')"
                    v-model="message.recipients[key]"
                  />
                  <b-button
                    slot="append"
                    icon="close-round"
                    @click.prevent="removeRecipient(key)"
                  />
                </b-form-group>
              </div>
            </template>

            <b-form-group
              :label="$t('form.subject')"
              :label-cols-lg="3"
              required
              v-if="currentMessage === null"
            >
              <b-form-input
                name="subject"
                :placeholder="$t('form.subject')"
                v-model="message.subject"
              />
            </b-form-group>

            <b-form-group
              :label="$t('form.message')"
              :label-cols-lg="3"
              required
            >
              <b-form-textarea
                name="message"
                :rows="4"
                :placeholder="$t('form.message')"
                v-model="message.message"
              />
            </b-form-group>

            <div class="text-right">
              <b-button @click="submitMessage()">
                {{ $t('form.send') }}
              </b-button>
            </div>
          </b-form>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import _ from 'lodash';
  import {isEmpty} from '~/lib/utils';
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
      ...mapGetters('player', ['currentPlayer']),
    },
    data() {
      return {
        subject: null,
        currentMessage: null,
        writeTo: null,
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
          'selected',
          {
            label: this.$t('inbox.status'),
            key: 'status',
          },
          {
            label: this.$t('inbox.date'),
            key: 'created_at',
          },
        ];

        if (this.directory === this.type.inbox || this.directory === this.type.archive) {
          columns.push({
            label: this.$t('inbox.sender'),
            key: 'sender',
          });
        }

        if (this.directory !== this.type.inbox || this.directory === this.type.archive) {
          columns.push({
            label: this.$t('inbox.recipient'),
            key: 'recipient',
          });
        }

        columns.push({
          label: this.$t('inbox.subject'),
          key: 'subject',
        });

        columns.push({
          label: this.$t('inbox.actions'),
          key: 'action',
        });

        return columns;
      },
      selectDirectory(directory) {
        this.page = this.type.loading;
        this.$nuxt.$loading.start();
        api.getInboxDirectory(directory).then((res) => {
          this.$nuxt.$loading.finish();
          this.page = this.type.list;
          this.directory = directory;
          this.messages = res.data.messages;
          this.currentMessage = null;
        });
      },
      writeMessage() {
        this.page = this.type.write;
        this.message.subject = '';
        this.message.message = '';
        this.message.recipients = [''];
        this.currentMessage = null;
      },
      replyMessage() {
        this.page = this.type.write;
        this.message.message = `\n\n${'='.repeat(50)}\n${this.currentMessage.message}`;
      },
      deleteMessage() {
        this.page = this.type.loading;
        this.$nuxt.$loading.start();
        api.deleteMessage(this.currentMessage.id).then(() => {
          this.selectDirectory(this.directory);
          this.$nuxt.$loading.finish();
        });
      },
      clearMessages(type) {
        this.page = this.type.loading;
        this.$nuxt.$loading.start();
        api.clearMessages(type).then(() => {
          this.selectDirectory(this.directory);
        });
      },
      archiveMessage() {
        this.page = this.type.loading;
        this.$nuxt.$loading.start();
        api.archiveMessage(this.currentMessage.id).then(() => {
          this.selectDirectory(this.type.archive);
        });
      },
      readMessage(id) {
        this.page = this.type.loading;
        this.$nuxt.$loading.start();
        api.readMessage(id).then((res) => {
          this.page = this.type.read;
          this.currentMessage = res.data.message;
          this.$nuxt.$loading.finish();
        });
      },
      back(directory) {
        this.selectDirectory(directory);
      },
      addRecipient() {
        this.message.recipients.push('');
      },
      removeRecipient(index) {
        this.message.recipients.splice(index, 1);
      },
      submitMessage() {
        this.$nuxt.$loading.start();
        const message = {...this.message};
        const recipients = [];
        _.uniq(message.recipients).forEach((r) => {
          recipients.push({name: r});
        });
        message.recipients = recipients;

        if (isEmpty(this.currentMessage)
          && (message.recipients.length === 0
            || isEmpty(message.subject)
            || isEmpty(message.message))) {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: this.$t('error.write'),
          });
        } else {
          this.page = this.type.loading;
          let prom;
          if (this.currentMessage) {
            prom = api.replyMessage(this.currentMessage.id, {inbox_message: message});
          } else {
            prom = api.postMessage({inbox_message: message});
          }

          prom.then((res) => {
            if (res.data.recipients.length === 0) {
              this.$notify({
                group: 'error',
                title: this.$t('inbox.message.unsent'),
              });
            } else {
              this.$notify({
                group: 'success',
                title: this.$t('inbox.message.sent', {names: res.data.recipients.join(', ')}),
              });
            }

            this.message.subject = '';
            this.message.message = '';
            this.message.recipients = [''];
            this.selectDirectory(this.type.inbox);
          });
        }
      },
    },
    mounted() {
      if (this.writeTo) {
        this.$nextTick(() => {
          this.writeMessage();
          this.message.recipients = [this.writeTo];
        });
      }
    },
    async asyncData({store, query}) {
      if (!store.state.player.connected) {
        return {};
      }

      let writeTo;
      if (query.write) {
        await api.getPlayerInfo(query.write).then((res) => {
          if (!isEmpty(res.data.player)) {
            writeTo = res.data.player.name;
          }
        }).catch(() => {});
      }

      return api.getInboxDirectory().then((res) => ({
        messages: res.data.messages,
        writeTo,
      })).catch(() => {});
    },
  };
</script>
