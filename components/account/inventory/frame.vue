<template>
  <div
    :class="{'inventory-modal': modal}"
    class="text-center"
  >
    <template v-if="modal">
      <template v-if="objects[type]">
        <div v-if="isOneEquipped">
          <div
            class="equiped"
            v-for="(playerObject, index) in objects[type]"
            :key="playerObject.id"
            v-if="playerObject.equipped"
          >
            <div class="inventory-box">
              <b-popover
                :title="playerObject.object.name"
                placement="auto"
                width="300"
                triggers="hover"
                :target="`object-${index}-${playerObject.object.id}`"
              >
                <object-description :object="playerObject.object" />
              </b-popover>

              <img
                :id="`object-${index}-${playerObject.object.id}`"
                :src="`/images/objects/${playerObject.object.image}`"
                @click.prevent="choose()"
              >
              <br>
            </div>

            <b-button
              size="sm"
              variant="primary"
              @click.prevent="unequip(playerObject.object.id)"
            >
              {{ $t('inventory.unequip') }}
            </b-button>
          </div>
        </div>
        <div
          class="inventory-box"
          v-else
        >
          <b-button
            size="sm"
            variant="primary"
            @click.prevent="choose()"
          >
            {{ $t('inventory.choose') }}
          </b-button>
        </div>
      </template>
      <template v-else>
        <div class="inventory-box">
          {{ $t('inventory.no.items') }}
        </div>
      </template>

      <b-modal
        v-model="displayModal"
        effect="fade"
        :width="500"
        hide-footer
        hide-header
      >
        <div
          class="inventory clearfix"
          v-if="objects[type]"
        >
          <div
            v-for="playerObject in getNotEquippedObjects()"
            :key="playerObject.id"
          >
            <b-popover
              :title="playerObject.object.name"
              placement="top"
              width="300"
              triggers="hover"
              class="image-block"
              :target="`object-${index}-${playerObject.object.id}`"
            >
              <div slot="content">
                <object-description :object="playerObject.object" />
              </div>
            </b-popover>
            <img
              :id="`object-${index}-${playerObject.object.id}`"
              :src="`/images/objects/${playerObject.object.image}`"
            />
            <br>

            <div class="btn-group btn-group-xs">
              <b-button
                size="sm"
                variant="success"
                @click.prevent="equip(playerObject.object.id)"
                v-if="playerObject.can_be_equipped"
              >
                {{ $t('inventory.equip') }}
              </b-button>

              <b-popover
                confirm
                :title="$t('modal.confirm.drop')"
                @on-ok="drop(playerObject.object.id)"
                :target="`object-drop-${index}-${playerObject.object.id}`"
              />
              <b-button
                variant="danger"
                size="sm"
                :id="`object-drop-${index}-${playerObject.object.id}`"
                v-if="playerObject.can_be_dropped"
              >
                {{ $t('inventory.drop') }}
              </b-button>
            </div>
          </div>
        </div>
      </b-modal>
    </template>
    <template v-else>
      <div
        class="inventory list clearfix"
        v-if="objects[type]"
      >
        <div
          v-for="playerObject in objects[type]"
          :key="playerObject.id"
          v-if="!playerObject.equipped"
        >
          <b-popover
            :title="playerObject.object.name"
            placement="top"
            width="300"
            triggers="hover"
            :target="`object-${index}-${playerObject.object.id}`"
          >
            <div slot="content">
              <object-description :object="playerObject.object" />
            </div>
          </b-popover>
          <img
            :id="`object-${index}-${playerObject.object.id}`"
            :src="`/images/objects/${playerObject.object.image}`"
          />

          <br>
          <div class="btn-group btn-group-xs">
            <template v-if="playerObject.can_be_used">
              <b-form-select
                v-model="selectedObjects[playerObject.object.id]"
                v-if="playerObject.can_use_many && playerObject.number > 1"
              >
                <b-form-select-option
                  :value="nb"
                  v-for="nb in playerObject.number"
                  :key="nb"
                >
                  {{ nb }}
                </b-form-select-option>
              </b-form-select>

              <b-popover
                confirm
                :title="$t('modal.confirm.use')"
                @on-ok="use(playerObject.object.id)"
                :target="`button-use-${index}-${playerObject.object.id}`"
              >
              </b-popover>
              <b-button
                size="sm"
                :id="`button-use-${index}-${playerObject.object.id}`"
              >
                {{ $t('inventory.use') }}
              </b-button>
            </template>

            <b-popover
              confirm
              :title="$t('modal.confirm.drop')"
              @on-ok="drop(playerObject.object.id)"
              :target="`button-drop-${index}-${playerObject.object.id}`"
            />
            <b-button
              variant="danger"
              size="sm"
              :id="`button-drop-${index}-${playerObject.object.id}`"
              v-if="playerObject.can_be_dropped"
            >
              {{ $t('inventory.drop') }}
            </b-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import api from '~/services/api';
  import ErrorMixin from '~/components/mixins/error';
  import MessagesMixin from '~/components/mixins/messages';
  import ObjectDescription from '~/components/object/description';

  export default {
    mixins: [
      ErrorMixin,
      MessagesMixin,
    ],
    components: {
      ObjectDescription,
    },
    props: {
      objects: {
        type: [Object, Array],
        required: true,
      },
      type: {
        type: Number,
        required: true,
      },
      modal: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        selectedObjects: {},
        displayModal: false,
      };
    },
    computed: {
      isOneEquipped() {
        let isEquipped = false;
        Object.values(this.objects[this.type]).forEach((object) => {
          if (object.equipped) {
            isEquipped = true;
          }
        });

        return isEquipped;
      },
    },
    beforeMount() {
      if (!this.modal && this.objects[this.type]) {
        Object.values(this.objects[this.type]).forEach((playerObject) => {
          if (playerObject.can_use_many && playerObject.number > 1) {
            this.selectedObjects[playerObject.object.id] = 1;
          }
        });
      }
    },
    methods: {
      getNotEquippedObjects() {
        const result = [];
        if (this.objects[this.type]) {
          Object.values(this.objects[this.type]).forEach((object) => {
            if (!object.equipped) {
              result.push(object);
            }
          });
        }

        if (result.length === 0) {
          this.displayModal = false;
        }

        return result;
      },
      async unequip(objectId) {
        await api.unequipObject(objectId).then((res) => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.handleMessages(res.data),
          });
        }).catch(() => {
          this.raiseError();
        });
        await this.$emit('reload');
      },
      async equip(objectId) {
        await api.equipObject(objectId).then(async (res) => {
          res.data.messages.forEach((msg) => {
            this.$notify({
              group: 'success',
              title: this.$t('notice.success'),
              text: this.handleMessages(msg),
            });
          });
          await this.$emit('reload');
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
      },
      async drop(objectId) {
        let nb = 1;
        if (this.selectedObjects[objectId]) {
          nb = this.selectedObjects[objectId];
        }

        await api.dropObject(objectId, nb).then((res) => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.handleMessages(res.data),
          });
        }).catch(() => {
          this.raiseError();
        });
        await this.$emit('reload');
      },
      async use(objectId) {
        let nb = 1;
        if (this.selectedObjects[objectId]) {
          nb = this.selectedObjects[objectId];
        }

        await api.useObject(objectId, nb).then((res) => {
          this.$notify({
            group: 'success',
            title: this.$t('notice.success'),
            text: this.handleMessages(res.data),
          });
        }).catch(() => {
          this.raiseError();
        });
        await this.$emit('reload');
      },
      choose() {
        if (this.getNotEquippedObjects().length > 0) {
          this.displayModal = true;
        } else {
          this.displayModal = false;
        }
      },
    },
  };
</script>
