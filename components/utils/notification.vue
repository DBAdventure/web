<template>
  <notifications
    :group="group"
    animation-name="v-fade-left"
    position="top right"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <div class="vue-notification" :class="group">
        <div class="vue-notification-notice-content">
          <span class="vue-notification-icon vue-notification-icon-info">
            <b-icon icon="check-circle" />
          </span>

          <div class="vue-notification-title">
            {{ props.item.title }}
          </div>

          <div
            class="vue-notification-desc"
            v-html="props.item.text"
          >
          </div>
        </div>

        <div class="vue-notification-content-with-icon"></div>
        <a
          class="vue-notification-notice-close"
          @click="props.close"
        >
          <b-icon icon="x" />
        </a>
      </div>
    </template>
  </notifications>
</template>

<script>
  export default {
    props: {
      group: {
        type: String,
        required: false,
        default: null,
      },
    },
  };
</script>
