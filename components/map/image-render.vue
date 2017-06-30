<template>
    <img data-trigger="hover"
         data-toggle="tooltip"
         data-placement="top"
         :title="`(${x}, ${y}) ${title}`"
         :src="image"
    />
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
