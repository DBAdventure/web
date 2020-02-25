<template>
  <div>
    <h1 class="title title-default">
      {{ $t('guild.create') }}
    </h1>

    <b-form>
      <b-form-group
        :label="$t('form.name')"
        :label-cols-lg="3"
      >
        <b-form-input
          :placeholder="$t('form.name')"
          v-model="guild.name"
          required
          :class="{ 'is-invalid': submitted && $v.guild.name.$error }"
        />
        <div
          v-if="submitted && !$v.guild.name.required"
          class="invalid-feedback"
        >
          {{ $t('form.required') }}
        </div>
      </b-form-group>

      <b-form-group
        :label="$t('form.shortName')"
        :label-cols-lg="3"
      >
        <b-form-input
          :maxlength="5"
          :placeholder="$t('form.shortName')"
          v-model="guild.shortName"
          required
          :class="{ 'is-invalid': submitted && $v.guild.shortName.$error }"
        />
        <div
          v-if="submitted && !$v.guild.shortName.required"
          class="invalid-feedback"
        >
          {{ $t('form.required') }}
        </div>
      </b-form-group>

      <b-form-group
        :label="$t('form.history')"
        :label-cols-lg="3"
      >
        <b-form-textarea
          :placeholder="$t('form.history')"
          v-model="guild.history"
          :rows="4"
          required
          :class="{ 'is-invalid': submitted && $v.guild.history.$error }"
        />
        <div
          v-if="submitted && !$v.guild.history.required"
          class="invalid-feedback"
        >
          {{ $t('form.required') }}
        </div>
      </b-form-group>

      <div>
        <div class="text-right">
          <b-button
            variant="primary"
            @click.prevent="handleSubmit()"
            block
          >
            {{ $t('form.create') }}
          </b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {
    required,
    minLength,
    maxLength,
  } from 'vuelidate/lib/validators';
  import api from '~/services/api';
  import ErrorMixin from '~/components/mixins/error';

  export default {
    middleware: 'auth',
    mixins: [
      ErrorMixin,
    ],
    head() {
      return {
        title: this.$t('guild.create'),
      };
    },
    computed: {
      ...mapGetters('player', ['currentPlayer']),
    },
    data() {
      return {
        submitted: false,
        guild: {
          name: '',
          shortName: '',
          history: '',
        },
      };
    },
    validations: {
      guild: {
        name: {required},
        shortName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(5),
        },
        history: {
          required,
        },
      },
    },

    methods: {
      handleSubmit() {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.$notify({
            group: 'error',
            title: this.$t('notice.error'),
            text: this.$t('form.invalid'),
          });
          return;
        }

        api.createGuild({guild_create: this.guild}).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('guild.created'),
          });
          this.$router.push('/guild');
        }).catch(() => {
          this.raiseError();
        });
      },
    },
  };
</script>
