<template>
  <div>
    <h1 class="title title-register">
      {{ $t('register.text') }}
    </h1>
    <p>{{ $t('register.welcome') }}</p>
    <p>{{ $t('register.intro') }}</p>

    <b-form>
      <h2>{{ $t('register.personalinfo') }}</h2>

      <b-form-group
        :label="$t('form.login')"
        :label-cols-lg="3"
        required
      >
        <b-input
          :placeholder="$t('form.login')"
          v-model="player.username"
          :class="{ 'is-invalid': submitted && $v.player.username.$error }"
        />
        <div
          v-if="submitted && $v.player.username.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.player.email.required">{{ $t('form.required') }}</span>
        </div>
      </b-form-group>
      <b-form-group
        :label="$t('form.email')"
        :label-cols-lg="3"
        required
      >
        <b-input
          :placeholder="$t('form.email')"
          v-model="player.email"
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

      <div>
        <div class="col-sm-offset-2 col-sm-10">
          <b-button
            variant="primary"
            @click.prevent="handleSubmit()"
            block
          >
            {{ $t('register.text') }}
          </b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
  import {
    required,
    email,
  } from 'vuelidate/lib/validators';
  import api from '~/services/api';
  import {isEmpty, entries} from '~/lib/utils';

  export default {
    middleware: 'anonymous',
    head() {
      return {
        title: this.$t('register.title'),
      };
    },
    data() {
      return {
        submitted: false,
        player: {
          username: '',
          email: '',
        },
      };
    },
    validations: {
      player: {
        username: {required},
        email: {
          required,
          email,
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

        api.lostPassword({player_registration: this.player}).then(() => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.$t('account.lost.description'),
          });
          this.$router.push('/');
        }).catch((e) => {
          if (!isEmpty(e.response.data.error)) {
            /* eslint-disable no-restricted-syntax */
            for (const [key, messages] of entries(e.response.data.error)) {
              this.$notify({
                group: 'error',
                title: this.$t(key),
                text: messages.join('.\n'),
              });
            }
            /* eslint-enable no-restricted-syntax */
          } else {
            this.$notify({
              group: 'error',
              title: this.$t('notice.error'),
              text: this.$t('error.generic'),
            });
          }
        });

        this.submitted = false;
      },
    },
  };
</script>
