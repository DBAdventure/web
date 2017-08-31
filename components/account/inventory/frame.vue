<template>
    <div class="text-center">
        <template v-if="objects[type]">
            <div class="equiped" v-for="playerObject in objects[type]" v-if="playerObject.equipped">
                <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                        :content="$t(`objects.${playerObject.object.name}.description`)"
                        placement="top"
                        width="300"
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
                        width="300"
                        trigger="hover">
                    <img :src="`/images/objects/${playerObject.object.image}`" />
                </Poptip>
                <br/>
                <div class="btn-group btn-group-xs">
                    <template v-if="playerObject.can_be_used">
                        <Select name="nb-objects" v-model="selectedObjects[playerObject.object.id]" class="form-control" v-if="playerObject.can_use_many && playerObject.number > 1">
                            <template v-for="nb in playerObject.number">
                                <Option :value="nb">{{ nb }}</Option>
                            </template>
                        </Select>
                        <Poptip
                            confirm
                            :title="$t('modal.confirm.title')"
                            :content="$t('modal.confirm.use')"
                            @on-ok="use(playerObject.object.id)"
                        >
                            <Button class="btn btn-default btn-xs">{{ $t('inventory.use')}}</Button>
                        </Poptip>
                    </template>

                    <button class="btn btn-default btn-xs" @click.prevent="equip(playerObject.object.id)" v-if="playerObject.can_be_equipped" >
                        {{ $t('inventory.equip')}}
                    </button>

                    <Poptip
                        confirm
                        :title="$t('modal.confirm.title')"
                        :content="$t('modal.confirm.drop')"
                        @on-ok="drop(playerObject.object.id)"
                    >
                        <button v-if="playerObject.can_be_dropped" class="btn btn-danger btn-xs">
                            {{ $t('inventory.drop')}}
                        </button>
                    </Poptip>
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
                api.unequipObject(objectId).then((res) => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: res.data.message,
                    });
                    this.$emit('reload');
                });
            },
            equip(objectId) {
                api.equipObject(objectId).then((res) => {
                    res.data.messages.forEach((msg) => {
                        this.$Notice.success({
                            title: this.$t('notice.success'),
                            desc: msg,
                        });
                    });
                    this.$emit('reload');
                }).catch((err) => {
                    if (err.response.data.error) {
                        this.$Notice.error({
                            title: this.$t('notice.error'),
                            desc: err.response.data.error,
                        });
                    }
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
                        desc: res.data.message,
                    });
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
                        desc: res.data.message,
                    });
                    this.$emit('reload');
                });
            },
        },
    };
</script>
