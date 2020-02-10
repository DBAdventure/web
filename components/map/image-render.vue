<template>
    <Poptip
        :title="title"
        :content="`${x}, ${y}`"
        placement="top"
        trigger="hover"
    >
        <img :src="image">
    </Poptip>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            x: {
                type: [Number, String],
                required: true,
            },
            y: {
                type: [Number, String],
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
    };
</script>
