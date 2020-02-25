<template>
  <div>
    {{ object.description }}


    <stats :data="object.bonus" />
    <requirements :data="object.requirements" />
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
  };
</script>
