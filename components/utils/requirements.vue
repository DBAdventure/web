<template>
  <div
    v-if="hasData(data)"
    class="details"
  >

    <strong>{{ $t('requirements.name') }}</strong>

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
    methods: {
      hasData(data) {
        console.log(data);

        return Object.keys(data).length > 0;
      },
    },
  };
</script>
