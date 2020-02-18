<template>
  <img
    v-b-popover.hover.top="`${x}, ${y}`"
    :title="title"
    :src="image"
  >
</template>

<script>
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
