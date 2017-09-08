<template>
    <div>
        <h1 class="title title-appearance">{{ $t('appearance') }}</h1>
        <table class="table-apparence">
            <tbody>
                <tr>
                    <td align="center" width="75" height="75" background="/media/map/day/grass_0.png">
                        <img class="perso-images" type="image" :src="selectedImage" border="0">
                    </td>
                    <td align="center" width="10" height="75"></td>
                    <td align="center" width="75" height="75" background="/media/map/day/sand_0.png">
                        <img class="perso-images" type="image" :src="selectedImage" border="0">
                    </td>
                    <td align="center" width="10" height="75"></td>
                    <td align="center" width="75" height="75" background="/media/map/day/ground_0.png">
                        <img class="perso-images" type="image" :src="selectedImage" border="0">
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            <Select
                v-if="player_race !== null"
                v-model="player_appearance.type"
                :placeholder="$t('choice.character')"
                clearable
                required>
                <Option v-for="value, key in appearances[player_race]" :key="key" :value="key">{{ value.label }} {{ key }}</Option>
            </Select>

            <Select
                v-if="player_appearance.type !== null && appearances[player_race]"
                v-model="player_appearance.image"
                required>
                <Option v-for="value, key in appearances[player_race][player_appearance.type].value" :key="key" :value="value">{{ key }}</Option>
            </Select>

            <Button type="primary" @click.prevent="handleSubmit()" long>{{ $t('save') }}</Button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import {entries} from '~/lib/utils';
    import api from '~/services/api';

    export default {
        middleware: 'auth',
        head() {
            return {
                title: this.$t('account.title'),
            };
        },
        data() {
            return {
                player_race: null,
                player_appearance: {
                    type: null,
                    image: null,
                },
                appearances: {},
            };
        },
        asyncData() {
            return api.getAppearanceData().then(res => (
                {
                    appearances: res.data,
                }
            ));
        },
        mounted() {
            this.player_race = this.currentPlayer.race.id;
            this.player_appearance.image = this.currentPlayer.image;

            /* eslint-disable no-restricted-syntax */
            for (const [type, data] of entries(this.appearances[this.player_race])) {
                if (Object.values(data.value).indexOf(this.currentPlayer.image) !== -1) {
                    this.player_appearance.type = type;
                    break;
                }
            }
            /* eslint-enable no-restricted-syntax */
        },
        computed: {
            ...mapGetters([
                'currentPlayer',
            ]),
            selectedImage() {
                return `/images/avatars/players/${this.player_appearance.image}`;
            },
        },
        methods: {
            handleSubmit() {
                const data = {
                    player_registration_race: this.player_race,
                    player_appearance: this.player_appearance,
                };

                api.updateAppearance(data).then(() => {
                    this.$Notice.success({
                        title: this.$t('notice.success'),
                        desc: this.$t('account.appearance.success'),
                    });
                    this.$store.dispatch('fetchPlayer');
                }).catch(() => {
                    this.$Notice.error({
                        title: this.$t('notice.error'),
                        desc: this.$t('account.appearance.failed'),
                    });
                });
            },
        },
    };
</script>
