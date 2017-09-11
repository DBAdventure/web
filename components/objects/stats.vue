<template>
    <ul>
        <li v-for="value, key in data">
            {{ $t(`objects.details.${key}`, {value}) }}
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
