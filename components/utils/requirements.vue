<template>
  <ul class="requirements">
    <li
      v-for="(value, key) in data"
      :key="key"
      v-html="$t(`requirements.details.${key}`, {value})"
    />
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
