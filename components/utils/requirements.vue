<template>
    <ul class="requirements">
        <li v-for="value, key in data" v-html="$t(`spells.details.${key}`, {value})"></li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            data: {
                type: [Object, Array],
                required: true,
            },
        },
    };
</script>
