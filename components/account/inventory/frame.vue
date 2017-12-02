<template>
    <div :class="{'inventory-modal': modal}" class="text-center">
        <template v-if="modal">
            <template v-if="objects[type]">
                <div v-if="isOneEquipped">
                    <div class="equiped" v-for="playerObject in objects[type]" v-if="playerObject.equipped">
                        <div class="inventory-box">
                            <Poptip :title="playerObject.object.name"
                                    :content="playerObject.object.description"
                                    placement="top"
                                    width="300"
                                    trigger="hover">
                                <img :src="`/images/objects/${playerObject.object.image}`" @click.prevent="choose()" /><br/>
                            </Poptip>
                        </div>
                        <Button size="small" type="primary" @click.prevent="unequip(playerObject.object.id)">
                            {{ $t('inventory.unequip') }}
                        </Button>
                    </div>
                </div>
                <div class="inventory-box" v-else>
                    <Button size="small" type="primary" @click.prevent="choose()">
                        {{ $t('inventory.choose') }}
                    </Button>
                </div>
            </template>
            <template v-else>
                <div class="inventory-box">
                    {{ $t('inventory.no.items') }}
                </div>
            </template>

            <Modal v-model="displayModal" effect="fade" :width="500">
                <div class="inventory clearfix" v-if="objects[type]">
                    <div v-for="playerObject in getNotEquippedObjects()">
                        <Poptip :title="playerObject.object.name"
                                :content="playerObject.object.description"
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
                    <Poptip :title="playerObject.object.name"
                            :content="playerObject.object.description"
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
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
                    });
                }).catch(() => {
                    this.raiseError();
                });
                await this.$emit('reload');
            },
            async equip(objectId) {
                await api.equipObject(objectId).then(async (res) => {
                    res.data.messages.forEach((msg) => {
                        this.$Notice.success({
                            title: this.$t('notice.success'),
                            desc: this.handleMessages(msg),
                        });
                    });
                    await this.$emit('reload');
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
                });
            },
            async drop(objectId) {
                let nb = 1;
                if (this.selectedObjects[objectId]) {
                    nb = this.selectedObjects[objectId];
                }

                await api.dropObject(objectId, nb).then((res) => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
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
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.handleMessages(res.data),
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
