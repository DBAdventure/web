<template>
    <div class="text-center">
        <template v-if="modal">
            <template v-if="objects[type]">
                <div v-if="isOneEquipped">
                    <div class="equiped" v-for="playerObject in objects[type]" v-if="playerObject.equipped">
                        <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                                :content="$t(`objects.${playerObject.object.name}.description`)"
                                placement="top"
                                width="300"
                                trigger="hover">
                            <img :src="`/images/objects/${playerObject.object.image}`" @click.prevent="choose()" /><br/>
                            <Button size="small" type="primary" @click.prevent="unequip(playerObject.object.id)">
                                {{ $t('inventory.unequip') }}
                            </Button>
                        </Poptip>
                    </div>
                </div>
                <div v-else>
                    <Button size="small" type="primary" @click.prevent="choose()">
                        {{ $t('inventory.choose') }}
                    </Button>
                </div>
            </template>
            <template v-else>
                {{ $t('inventory.no.items') }}
            </template>

            <Modal v-model="displayModal" effect="fade" :width="500">
                <div class="inventory clearfix" v-if="objects[type]">
                    <div v-for="playerObject in objects[type]" v-if="!playerObject.equipped">
                        <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                                :content="$t(`objects.${playerObject.object.name}.description`)"
                                placement="top"
                                width="300"
                                trigger="hover"
                                class="image-block">
                            <img :src="`/images/objects/${playerObject.object.image}`" />
                        </Poptip>
                        <br/>
                        <div class="btn-group btn-group-xs">
                            <Button size="small" @click.prevent="equip(playerObject.object.id)" v-if="playerObject.can_be_equipped">
                                {{ $t('inventory.equip')}}
                            </Button>

                            <Poptip
                                confirm
                                :title="$t('modal.confirm.drop')"
                                @on-ok="drop(playerObject.object.id)"
                            >
                                <Button type="error" size="small" v-if="playerObject.can_be_dropped">
                                    {{ $t('inventory.drop')}}
                                </Button>
                            </Poptip>
                        </div>
                    </div>
                </div>
                <div slot="footer"></div>
            </Modal>
        </template>
        <template v-else>
            <div class="inventory list clearfix" v-if="objects[type]">
                <div v-for="playerObject in objects[type]" v-if="!playerObject.equipped">
                    <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                            :content="$t(`objects.${playerObject.object.name}.description`)"
                            placement="top"
                            width="300"
                            trigger="hover">
                        <img :src="`/images/objects/${playerObject.object.image}`" />
                    </Poptip>
                    <br/>
                    <div class="btn-group btn-group-xs">
                        <template v-if="playerObject.can_be_used">
                            <Select v-model="selectedObjects[playerObject.object.id]" v-if="playerObject.can_use_many && playerObject.number > 1">
                                <template v-for="nb in playerObject.number">
                                    <Option :value="nb">{{ nb }}</Option>
                                </template>
                            </Select>
                            <Poptip
                                confirm
                                :title="$t('modal.confirm.use')"
                                @on-ok="use(playerObject.object.id)"
                            >
                                <Button size="small">{{ $t('inventory.use')}}</Button>
                            </Poptip>
                        </template>

                        <Poptip
                            confirm
                            :title="$t('modal.confirm.drop')"
                            @on-ok="drop(playerObject.object.id)"
                        >
                            <Button type="error" size="small" v-if="playerObject.can_be_dropped">
                                {{ $t('inventory.drop')}}
                            </Button>
                        </Poptip>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';
    import ErrorMixin from '~/components/mixins/error';
    import MessagesMixin from '~/components/mixins/messages';

    export default {
        mixins: [
            ErrorMixin,
            MessagesMixin,
        ],
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
            unequip(objectId) {
                api.unequipObject(objectId).then((res) => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
                    });
                    this.$emit('reload');
                }).catch(() => {
                    this.raiseError();
                    this.$emit('reload');
                });
            },
            equip(objectId) {
                api.equipObject(objectId).then((res) => {
                    res.data.messages.forEach((msg) => {
                        this.$Notice.success({
                            title: this.$t('notice.success'),
                            desc: this.handleMessages(msg),
                        });
                    });
                    this.$emit('reload');
                }).catch((err) => {
                    if (err.response.data.error) {
                        this.$Notice.error({
                            title: this.$t('notice.error'),
                            desc: err.response.data.error,
                        });
                    } else {
                        this.$Notice.error({
                            title: this.$t('notice.error'),
                            desc: this.$t('notice.generic'),
                        });
                    }
                    this.$emit('reload');
                });
            },
            drop(objectId) {
                let nb = 1;
                if (this.selectedObjects[objectId]) {
                    nb = this.selectedObjects[objectId];
                }

                api.dropObject(objectId, nb).then((res) => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
                    });
                    this.$emit('reload');
                }).catch(() => {
                    this.raiseError();
                    this.$emit('reload');
                });
            },
            use(objectId) {
                let nb = 1;
                if (this.selectedObjects[objectId]) {
                    nb = this.selectedObjects[objectId];
                }

                api.useObject(objectId, nb).then((res) => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
                    });
                    this.$emit('reload');
                }).catch(() => {
                    this.raiseError();
                    this.$emit('reload');
                });
            },
            choose() {
                this.displayModal = true;
            },
        },
    };
</script>
