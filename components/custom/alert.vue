<template>
    <div v-if="messages.length">
        <bs-alert
            v-for="message in messages"
            class="col-lg-6"
            placement="top"
            duration="message.timeout"
            :type="message.level"
            dismissable>
            <span class="glyphicon glyphicon-info-sign glyphicon-align-left"></span>
            {{ message.message }}
        </bs-alert>
    </div>
</template>

<script type="text/ecmascript-6">
 import {manager} from '~/lib/messages';
 import BsAlert from '~/components/bootstrap/alert.vue';

 export default {
     components: {
         BsAlert,
     },
     data() {
         return {
             manager,
             unRegisterCallback: undefined,
             messages: [],
         };
     },
     mounted() {
         this.unRegisterCallback = this.manager.onChange((messages) => {
             this.messages = messages;
         });
     },
     beforeDestroy() {
         if (this.unRegisterCallback) {
             this.unRegisterCallback();
         }
     },
     methods: {
         drop(message) {
             this.manager.drop(message.idx);
         },
     },
 };
</script>
