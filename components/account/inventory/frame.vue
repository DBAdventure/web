<template>
    <div class="text-center">
        <template v-if="objects[type]">
            <div class="equiped" v-for="playerObject in objects[type]" v-if="playerObject.equipped">
            <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                    :content="$t(`objects.${playerObject.object.name}.description`)"
                    placement="top"
                    trigger="hover">
                <img :src="`/images/objects/${playerObject.object.image}`" /><br/>
                <button class="btn btn-primary btn-xs" @click.prevent="unequip(playerObject.object.id)" >
                    {{ $t('inventory.unequip') }}
                </button>
            </Poptip>
            </div>
        </template>
        <template v-else>
            {{ $t('inventory.no.items') }}
        </template>

        <div class="inventory clearfix" v-if="objects[type]">
            <div v-for="playerObject in objects[type]" v-if="!playerObject.equipped">
                <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                        :content="$t(`objects.${playerObject.object.name}.description`)"
                        placement="top"
                        trigger="hover">
                    <img :src="`/images/objects/${playerObject.object.image}`" />
                </Poptip>
                <br/>
                <div class="btn-group btn-group-xs">
                    <template v-if="playerObject.can_be_used && playerObject.number > 1">
                        <Select name="nb-objects" v-model="selectedObjects[playerObject.object.id]" class="form-control" v-if="playerObject.can_use_many">
                            <template v-for="nb in playerObject.number">
                                <Option :value="nb">{{ nb }}</Option>
                            </template>
                        </Select>

                        <Button @click.prevent="use(playerObject.object.id)" class="btn btn-default btn-xs">{{ $t('inventory.use')}}</Button>
                    </template>

                    <button class="btn btn-default btn-xs" @click.prevent="equip(playerObject.object.id)" v-if="playerObject.can_be_equipped" >
                        {{ $t('inventory.equip')}}
                    </button>

                    <button v-if="playerObject.can_be_dropped" data-toggle="confirmation" class="btn btn-danger btn-xs" @click.prevent="drop(playerObject.object.id)">
                        {{ $t('inventory.drop')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';

    export default {
        props: {
            objects: {
                type: Object,
                required: true,
            },
            type: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                selectedObjects: {},
            };
        },
        methods: {
            unequip(objectId) {
                api.unequipObject(objectId).then(() => {
                    this.$emit('reload');
                });
            },
            equip(objectId) {
                api.equipObject(objectId).then(() => {
                    this.$emit('reload');
                });
            },
            drop(objectId) {
                let nb = 1;
                if (this.selectedObjects[objectId]) {
                    nb = this.selectedObjects[objectId];
                }

                // @TODO
                /* this.$Modal.confirm({
                 *     title: this.$t('modal.confirm.title'),
                 *     content: this.$t('modal.confirm.drop'),
                 *     loading: true,
                 *     onOk: () => {
                 *     },
                 * });*/
                api.dropObject(objectId, nb).then(() => {
                    /* this.$Modal.remove();*/
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('notice.item.dropped'),
                    });
                    this.$emit('reload');
                });
            },
            use(objectId) {
                let nb = 1;
                if (this.selectedObjects[objectId]) {
                    nb = this.selectedObjects[objectId];
                }

                // @TODO

                api.useObject(objectId, nb).then(() => {
                    /* this.$Modal.remove();*/
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('notice.item.used'),
                    });
                    this.$emit('reload');
                });

                /* this.$Modal.confirm({
                 *     title: this.$t('modal.confirm.title'),
                 *     content: this.$t('modal.confirm.use'),
                 *     loading: true,
                 *     onOk: () => {
                 *     },
                 * });*/
            },
        },
    };
</script>
