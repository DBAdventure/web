<template>
  <div class="account">
    <h1 class="title title-information">
      {{ $t('header.settings') }}
    </h1>

    <b-form>
      <b-form-group
        :label="$t('form.email')"
        :label-cols-lg="3"
      >
        <b-input
          v-model="player.email"
          type="text"
          :class="{ 'is-invalid': submitted && $v.player.email.$error }"
        />
        <div
          v-if="submitted && $v.player.email.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.player.email.required">{{ $t('form.required') }}</span>
          <span v-if="!$v.player.email.email">{{ $t('form.invalidEmail') }}</span>
        </div>
      </b-form-group>

      <b-form-group
        :label="$t('form.login')"
        :label-cols-lg="3"
      >
        <b-input
          v-model="player.username"
          :class="{ 'is-invalid': submitted && $v.player.username.$error }"
        />
        <div
          v-if="submitted && !$v.player.username.required"
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
          v-model="player.history"
          :autosize="{minRows: 2,maxRows: 8}"
        />
      </b-form-group>

      <b-form-group
        :label="$t('form.password')"
        :label-cols-lg="3"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="player.password"
          :class="{ 'is-invalid': submitted && $v.player.password.$error }"
        />
        <div
          v-if="submitted && $v.player.password.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.player.password.minLength">
            {{ $t('form.passwordLength') }}
          </span>
        </div>
      </b-form-group>

      <b-form-group
        :label="$t('form.passwordConfirm')"
        :label-cols-lg="3"
      >
        <b-form-input
          type="password"
          v-model="player.password_confirm"
          :class="{ 'is-invalid': submitted && $v.player.password_confirm.$error }"
        />
        <div
          v-if="submitted && $v.player.password_confirm.$error"
          class="invalid-feedback"
        >
          <span if="!$v.player.password_confirm.sameAsPassword">
            {{ $t('form.passwordMatch') }}
          </span>
        </div>
      </b-form-group>

      <b-button
        variant="primary"
        @click.prevent="handleSubmit()"
        block
      >
        {{ $t('save') }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {
    required,
    minLength,
    sameAs,
    email,
  } from 'vuelidate/lib/validators';
  import api from '~/services/api';
  import ErrorMixin from '~/components/mixins/error';
  import MessagesMixin from '~/components/mixins/messages';

  export default {
    middleware: 'auth',
    mixins: [
      ErrorMixin,
      MessagesMixin,
    ],
    head() {
      return {
        title: this.$t('account.title'),
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    validations: {
      player: {
        email: {
          required,
          email,
        },
        username: {
          required,
        },
        password: {
          minLength: minLength(6),
        },
        password_confirm: {
          sameAsPassword: sameAs('password'),
        },
      },
    },
    data() {
      return {
        submitted: false,
        player: {
          email: '',
          username: '',
          history: '',
          password: '',
          password_confirm: '',
        },
      };
    },
    beforeMount() {
      this.player = {
        email: this.currentPlayer.email,
        username: this.currentPlayer.username,
        history: this.currentPlayer.history,
        password: '',
        password_confirm: '',
      };
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        this.$nuxt.$loading.start();
        api.saveSettings({player_settings: this.player}).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('account.saved'),
          });
          this.$store.dispatch('fetchPlayer');
        }).catch((err) => {
          if (err.response.data.error) {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: err.response.data.error,
            });
          } else {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t('notice.generic'),
            });
          }
        });

        this.$nuxt.$loading.finish();
        this.submitted = false;
      },
    },
  };
</script>
