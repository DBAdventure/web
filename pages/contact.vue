<template>
  <div class="contact">
    <h1 class="title title-contact">
      {{ $t('contact.title') }}
    </h1>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: this.$t('contact.title'),
      };
    },
    data() {
      return {
      };
    },
  };
</script>
