<template>
  <div
    v-if="Object.keys(data).length > 0"
    class="details"
  >
    <p>
      <strong>{{ $t('requirements.name') }}</strong>
    </p>

    <ul class="requirements">
      <li
        v-for="(value, key) in data"
        :key="key"
        v-html="$t(`requirements.details.${key}`, {value})"
      />
    </ul>
  </div>
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
