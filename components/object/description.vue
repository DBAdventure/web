<template>
  <div>
    {{ object.description }}

    <div
      v-if="hasData(object.bonus)"
      class="details"
    >
      <strong>{{ $t('bonus.name') }}</strong>
      <stats :data="object.bonus" />
    </div>
    <div
      v-if="hasData(object.requirements)"
      class="details"
    >
      <strong>{{ $t('requirements.name') }}</strong>
      <requirements
        :data="object.requirements"
      />
    </div>
  </div>
</template>

<script>
  import Stats from '~/components/utils/stats';
  import Requirements from '~/components/utils/requirements';

  export default {
    components: {
      Stats,
      Requirements,
    },
    props: {
      object: {
        type: Object,
        required: true,
      },
    },
    methods: {
      hasData(data) {
        return Object.keys(data).length > 0;
      },
    },
  };
</script>
