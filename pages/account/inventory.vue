<template>
    <div class="account">
        <h1 class="title title-inventory-equip">{{ $t('menu.inventory') }}</h1>

        <div id="inventory">
            <table class="character table">
                <tbody>
                    <tr>
                        <td>
                            <span class="type-title">{{ $t('inventory.cap') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_CAP" />
                        </td>
                        <td rowspan="3" width="250" :style="`background: url(${currentPlayer.getInventoryImagePath()}) no-repeat 50% 50%`">
                        </td>
                        <td>
                            <span class="type-title">{{ $t('inventory.accessory') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_ACCESSORY" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="type-title">{{ $t('inventory.vision') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_VISION" />
                        </td>
                        <td>
                            <span class="type-title">{{ $t('inventory.outfit') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_OUTFIT" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="type-title">{{ $t('inventory.weapon') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_WEAPON" />
                        </td>
                        <td>
                            <span class="type-title">{{ $t('inventory.shield') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_SHIELD" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="type-title">{{ $t('inventory.shoes') }}</span>
                            <frame :objects="objects" :type="settings.objects.TYPE_SHOES" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <p class="text-center">
                {{ $t('inventory.weight', {'weight': currentPlayer.inventory_weight, 'maxWeight': currentPlayer.inventory_max_weight}) }}
            </p>

            <h1 class="title title-inventory-objects">{{ $t('menu.inventory') }}</h1>
            <frame :objects="objects" :type="settings.objects.TYPE_CONSUMABLE" />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import settings from '~/config/general.config';
    import api from '~/services/api';
    import Frame from '~/components/account/inventory/frame';

    export default {
        middleware: 'auth',
        components: {
            Frame,
        },
        head() {
            return {
                title: this.$t('account.inventory.title'),
            };
        },
        data() {
            return {
                settings,
                objects: {},
            };
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
        },
        mounted() {
            console.log(this.objects);
        },
        asyncData() {
            return api.getInventoryObjects().then(res => (
                {
                    objects: res.data,
                }
            ));
        },
    };
</script>
