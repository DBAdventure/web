<template>
    <div class="faq">
        <h1 class="title title-faq">
            {{ $t('menu.faq') }}
        </h1>

        <Collapse>
            <Panel
                v-for="n in questionsList"
                :key="n"
            >
                {{ $t(`faq.questions[${n}].title`) }}
                <p
                    slot="content"
                    v-html="$t(`faq.questions[${n}].content`)"
                />
            </Panel>
        </Collapse>
    </div>
</template>

<script type="text/ecmascript-6">
    import _ from 'lodash';

    export default {
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
