<template>
    <dvi>
        <h1 class="title title-appearance">{{ $t('appearance') }}</h1>
    </dvi>
</template>

<script type="text/ecmascript-6">
 export default {
     middleware: 'auth',
     head: {
         title: 'Account profile',
     },
     data() {
         return {
         };
     },
 };
</script>
