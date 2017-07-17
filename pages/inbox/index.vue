<template>
    <div>
        <h1 class="title title-inbox">{{ $t('inbox.title') }}</h1>
        <div id="inbox">
            <div id="inbox-menu">
                <ul class="list-dots">
                    <li>
                        <a href="#" @click.prevent="write()">{{ $t('inbox.write') }}</a>
                    </li>
                    <li v-if="player.guild && player.guild.enabled">
                        <a href="#" @click.prevent="writeGuild()">{{ $t('inbox.guild.write') }}</a>
                    </li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="inbox()">{{ $t('inbox.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="outbox()">{{ $t('inbox.outbox') }}</a></li>
                    <li v-if="player.guild && player.guild.enabled">
                        <a href="#" @click.prevent="outbox(true)">{{ $t('inbox.guild.outbox') }}</a>
                    </li>

                    <li><a href="#" @click.prevent="archive()">{{ $t('inbox.archive') }}</a></li>
                    <li class="sep"></li>
                    <li><a href="#" @click.prevent="clear('inbox')">{{ $t('inbox.clear.inbox') }}</a></li>
                    <li><a href="#" @click.prevent="clear('outbox')">{{ $t('inbox.clear.outbox') }}</a></li>
                    <li v-if="player.guild && player.guild.enabled">
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
            ...mapGetters({
                player: 'getPlayer',
            }),
        },
    };
</script>
