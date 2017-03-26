
<template>
    <nuxt-container>
        <dba-header></dba-header>

        <div id="middle" class="container-fluid" :class="$store.state.style">
            <div id="menu">
                {% include "DbaGameBundle::menu.html.twig" %}
            </div>

            <div id="content">
                <div class="border-top">&nbsp;</div>
                <div class="body">
                    <nuxt/>
                </div>
                <div class="border-bottom">&nbsp;</div>
            </div>
            <div class="clearfix">&nbsp;</div>
        </div>

        <dba-footer></dba-footer>
        <alert></alert>
    </nuxt-container>
</template>

<script type="text/ecmascript-6">
 import DbaHeader from '~components/header.vue';
 import DbaFooter from '~components/footer.vue';
 import Alert from '~/components/custom/alert.vue';

 export default {
     components: {
         DbaHeader,
         DbaFooter,
         Alert,
     },
     mounted() {
         this.$store.dispatch('retrievePlayer');
     },
 };
</script>
