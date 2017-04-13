
<template>
    <nuxt-container>
        <div id="main">
            <dba-header></dba-header>

            <div class="middle container-fluid" :class="$store.state.game.style">
                <div id="menu">
                    <dba-menu></dba-menu>
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
        </div>
        <alert></alert>
    </nuxt-container>
</template>

<script type="text/ecmascript-6">
import DbaHeader from '~components/header.vue';
import DbaMenu from '~components/menu.vue';
import DbaFooter from '~components/footer.vue';
import Alert from '~/components/custom/alert.vue';

export default {
    components: {
        DbaHeader,
        DbaMenu,
        DbaFooter,
        Alert,
    },
    mounted() {
        this.$store.dispatch('fetchGameData');
        this.$store.dispatch('fetchPlayer');
    },
};
</script>
