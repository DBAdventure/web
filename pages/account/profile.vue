<template>
    <div class="account">
        <h1 class="title title-profile">{{ $trans('header.profile') }}</h1>
    </div>
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
