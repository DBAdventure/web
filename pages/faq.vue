<template>
    <div class="faq">
        <h1 class="title title-faq">{{ $t('menu.faq') }}</h1>

        <bs-accordion >
            <template v-for="n in questionsList">
                <bs-panel :is-open="n == 0" :header="$t(`faq.questions[${n}].title`)">
                    <p v-html="$t(`faq.questions[${n}].content`)"></p>
                </bs-panel>
            </template>
        </bs-accordion>
    </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash';
import BsAccordion from '~components/bootstrap/accordion.vue';
import BsPanel from '~components/bootstrap/panel.vue';

export default {
    components: {
        BsAccordion,
        BsPanel,
    },
    computed: {
        questionsList() {
            return _.range(7);
        },
    },
    head() {
        return {
            title: this.$t('faq.title'),
        };
    },
};
</script>
