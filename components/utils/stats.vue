<template>
    <ul class="stats">
        <li v-for="value, key in data" v-html="$t(`objects.details.${key}`, {value})"></li>
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
