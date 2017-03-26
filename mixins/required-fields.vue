<script type="text/ecmascript-6">
 export default {
     methods: {
         checkRequiredField(required, fields) {
             this[required] = true;
             if (fields.length !== 0) {
                 Object.values(fields).forEach((value) => {
                     if (value !== '') {
                         this[required] = false;
                     }
                 });
             }
         },
     },
 };
</script>
