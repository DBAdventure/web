<template>
    <div class="text-center">
        <template v-if="objects[type]">
            <div class="equiped" v-for="playerObject in objects[type]" v-if="playerObject.equipped">
                <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                        :content="$t(`objects.${playerObject.object.name}.description`)"
                        placement="top"
                        trigger="hover">
                    <img :src="`/images/objects/${playerObject.object.image}`" /><br/>
                    <button class="btn btn-primary btn-xs" @click.prevent="unequip(playerObject.id)" >
                        {{ $t('inventory.unequip') }}
                    </button>
                </Poptip>
            </div>
        </template>
        <template v-else>
            {{ $t('inventory.no.items') }}
        </template>

        <table class="inventory" v-if="objects[type]" >
            <tbody>
                <tr v-for="playerObject in objects[type]" v-if="!playerObject.equipped">
                    <td>
                        <Poptip :title="$t(`objects.${playerObject.object.name}.name`)"
                                :content="$t(`objects.${playerObject.object.name}.description`)"
                                placement="top"
                                trigger="hover">
                            <img :src="`/images/objects/${playerObject.object.image}`" />
                        </Poptip>
                        <br/>
                        <div class="btn-group btn-group-xs">
                            <template v-if="playerObject.can_be_used && playerObject.number > 1">
                                <Select name="nb-objects" :ref="`nb-objects-${playerObject.object.id}`" class="form-control" v-if="playerObject.can_use_many">
                                    <template v-for="nb in playerObject.number">
                                        <Option :value="nb">{{ nb }}</Option>
                                    </template>
                                </Select>

                                <Button @click.prevent="use()" class="btn btn-default btn-xs">{{ $t('inventory.use')}}</Button>
                            </template>

                            <button class="btn btn-default btn-xs" @click.prevent="equip(playerObject.id)" v-if="playerObject.can_be_equipped" >
                                {{ $t('inventory.equip')}}
                            </button>

                            <button v-if="playerObject.can_be_dropped" data-toggle="confirmation" class="btn btn-danger btn-xs" @click.prevent="drop(playerObject.id)">
                                {{ $t('inventory.drop')}}
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
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
            };
        },
        mounted() {
            console.log(this.objects);
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
                this.$Modal.confirm({
                    title: this.$t('modal.confirm.title'),
                    content: this.$t('modal.confirm.delete'),
                    loading: true,
                    onOk: () => {
                        api.dropObject(objectId).then(() => {
                            this.$Modal.remove();
                            this.$Notice.success({
                                title: this.$t('notice.item.dropped'),
                            });
                            this.$emit('reload');
                        });
                    },
                });
            },
        },
    };
</script>
