<template>
    <div class="text-center">
        <template v-if="objects[type]">
            <div class="equiped" v-for="object in objects[type]" v-if="playerObject.equipped">
                <Poptip :title="`$t('objects.${playerObject.object.name}.name)`"
                        :content="`$t('objects.${playerObject.object.name}.description)`"
                        placement="top"
                        trigger="hover">
                    <img :src="playerObject.object.image_path"  /><br/>
                    <button class="btn btn-primary btn-xs" @click.prevent="unequip(playerObject.id)" >
                        {{ $t('inventory.unequip') }}
                    </button>
                </Poptip>
            </div>
        </template>
        <template v-else>
            {{ $t('inventory.no.items') }}
        </template>

        <table class="inventory">
            <tr v-if="playerObject in objects[type]" v-if="playerObject.equipped ">
                <td>
                    <Poptip :title="`$t('objects.${playerObject.object.name}.name)`"
                            :content="`$t('objects.${playerObject.object.name}.description)`"
                            placement="top"
                            trigger="hover">
                        <img :src="playerObject.object.image_path"  />
                    </Poptip>
                    <br/>
                    <div class="btn-group btn-group-xs">
                        <form @submit.prevent="use()" v-if="playerObject.can_be_used">
                            <Select name="nb-objects" :ref="`nb-objects-${playerObject.object.id}`" class="form-control" v-if="playerObject.can_use_many">
                                <template v-for="i in playerObject.number">
                                    <Option :value="nb">{{ nb }}</Option>
                                </template>
                            </Select>

                            <button type="submit" class="btn btn-default btn-xs">{{ $t('inventory.use')}}</button>
                        </form>

                        <button class="btn btn-default btn-xs" @click.prevent="equip(playerObject.id)">
                            {{ $t('inventory.equip')}}
                        </a>

                        <button v-if="playerObject.can_be_dropped" data-toggle="confirmation" class="btn btn-danger btn-xs" @click.prevent="drop(playerObject.id)">
                            {{ 'inventory.drop' | trans}}
                        </a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '~/services/api';

    export default {
        props: {
            type: {
                type: String,
                required: true,
            },
            objects: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
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
