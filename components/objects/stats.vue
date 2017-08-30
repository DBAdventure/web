<template>
    <ul>
        <li v-for="value, key in data">
            {{ $t(`object.${key}`, {value}) }}
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>
